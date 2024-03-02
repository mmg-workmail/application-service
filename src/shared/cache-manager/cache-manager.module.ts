import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { RedisOptions } from './redise/options';



@Module({
  imports: [
    CacheModule.registerAsync(RedisOptions),
  ],
})
export class CacheManagerModule { }
