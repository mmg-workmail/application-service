import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './shared/configs/interface';
import { ConfigKey } from './shared/configs/enum';

@Injectable()
export class AppService {
  private appConfig: AppConfig 
  constructor(private configService: ConfigService) {
     this.appConfig = this.configService.get<AppConfig>(ConfigKey.APP)
  }
  getHello(): string {
    return this.appConfig.appName;
  }
}
