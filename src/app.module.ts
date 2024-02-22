import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigsModule } from './shared/configs/configs.module';
import { DatabaseModule } from './shared/database/database.module';


@Module({
  imports: [ConfigsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
