import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as TelegrafI18n from 'telegraf-i18n';
import { TelegrafMongoSession } from 'telegraf-session-mongodb';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const configService = app.get('ConfigService');
  const telegraf = app.get('TelegrafProvider');

  // Telegraf session storage
  await TelegrafMongoSession.setup(telegraf, configService.get('MONGODB_URI'), {
    collectionName: 'telegrafSessions',
    sessionName: 'session',
  });

  // Telegraf i18n instance
  // @ts-ignore
  const i18n = new TelegrafI18n({
    defaultLanguage: 'en',
    allowMissing: false,
    sessionName: 'session',
    useSession: true,
    directory: path.resolve(__dirname, 'core/i18n'),
  });
  telegraf.use(i18n.middleware());
  app.use(telegraf.webhookCallback('/webhook'));

  await app.listen(configService.get('app.port'));
}
bootstrap();
