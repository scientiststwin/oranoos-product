import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  const port = 3500
  const configService = app.get<ConfigService>(ConfigService)  
  
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${configService.get<string>('rabbitmq.host')}:${configService.get<number>('rabbitmq.port')}`],
      queue: 'products',
      queueOptions: {
        durable: false,
      }, 
    }
  })

  const config = new DocumentBuilder()
    .setTitle('Products')
    .setDescription('oranoos Products')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.startAllMicroservices(()=>{
    Logger.debug("Microservice is listening...")
  })

  await app.listen(port,'0.0.0.0').then(()=>{
    Logger.debug(`Server running on http://127.0.0.1:${port}/doc (${process.env.NODE_ENV})`)
  });
}
bootstrap();
