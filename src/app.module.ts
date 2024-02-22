import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigsModule } from './shared/configs/configs.module';


@Module({
  imports: [ConfigsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
