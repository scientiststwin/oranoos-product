import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  app.startAllMicroservices(()=>{
    Logger.debug("Microservice is listening...")
  })

  await app.listen(port,'0.0.0.0').then(()=>{
    Logger.debug(`Server running on http://127.0.0.1:${port}/doc (${process.env.NODE_ENV})`)
  });
}
bootstrap();
