import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './shared/configs/interface';
import { ConfigKey } from './shared/configs/enum';

async function bootstrap() {


  const app = await NestFactory.create(AppModule);



  // Set port of config 
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>(ConfigKey.APP)
console.log(appConfig.port)
  await app.listen(3000);


}
bootstrap();
