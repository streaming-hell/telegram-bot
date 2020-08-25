import { Injectable } from '@nestjs/common';
import { TelegrafCommand } from 'nestjs-telegraf';

@Injectable()
export class StartService {
  @TelegrafCommand('start')
  async startCommand(ctx) {
    await ctx.replyWithMarkdown(ctx.i18n.t('START_COMMAND_REPLY'));
  }
}
