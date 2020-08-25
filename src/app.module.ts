import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  app,
  telegrafModule,
  validationOptions,
  validationSchema,
} from './core/configs';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { StartModule } from './start/start.module';
import { ServicesModule } from './services/services.module';
import { SongLinkPmModule } from './song-link-pm/song-link-pm.module';
import { UsersModule } from './users/users.module';
import { mongooseModule } from './core/configs/mongoose-module.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [app, mongooseModule, telegrafModule],
      validationOptions,
      validationSchema,
      isGlobal: true,
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        configService.get('mongooseModule'),
      inject: [ConfigService],
    }),
    TelegrafModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('telegrafModule'),
      inject: [ConfigService],
    }),
    StartModule,
    ServicesModule,
    SongLinkPmModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
