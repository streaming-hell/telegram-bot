import { Injectable } from '@nestjs/common';
import { TelegrafCommand } from 'nestjs-telegraf';

@Injectable()
export class ServicesService {
  @TelegrafCommand('services')
  async servicesCommand(ctx) {
    await ctx.replyWithMarkdown(ctx.i18n.t('SERVICES_COMMAND_REPLY'));
  }
}
