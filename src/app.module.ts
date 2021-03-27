import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import validationSchema from './config/configs.schema'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import mongoConfig from './config/mongo.config'
import rabbitmqConfig from './config/rabbitmq.config';
import { JwtStrategy } from './shared/auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object(validationSchema),
      isGlobal: true,
      load: [mongoConfig, rabbitmqConfig]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: `mongodb://${config.get<string>('mongo.host')}/${config.get<string>('mongo.name')}`,
      }),
      inject: [ConfigService]
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
