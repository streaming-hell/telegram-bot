import { HttpModule, Module } from '@nestjs/common';
import { VkService } from './vk.service';

@Module({
  imports: [HttpModule],
  providers: [VkService],
  exports: [VkService],
})
export class VkModule {}
