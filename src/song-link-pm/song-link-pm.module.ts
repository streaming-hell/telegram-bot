import { HttpModule, Module } from '@nestjs/common';
import { ShazamModule } from '../shazam/shazam.module';
import { VkModule } from '../vk/vk.module';
import { UsersModule } from '../users/users.module';
import { SongLinkPmService } from './song-link-pm.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://api.streaming-hell.com/v1/',
    }),
    ShazamModule,
    VkModule,
    UsersModule,
  ],
  providers: [SongLinkPmService],
})
export class SongLinkPmModule {}
