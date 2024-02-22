import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configurations } from './configurations';

@Module({
  imports: [ConfigModule.forRoot({
    load: [...configurations],
    isGlobal: true,
    cache: false
  })],
})
export class ConfigsModule {}