import { registerAs } from "@nestjs/config";
import { ConfigKey, Environment } from "../enum";
import { AppConfig } from "../interface";

const APPConfig = registerAs(
    ConfigKey.App, (): AppConfig => ({
      env:
        Environment[process.env.NODE_ENV as keyof typeof Environment] ||
        Environment.Development,
      port: Number(process.env.APP_PORT),
      appName: process.env.APP_NAME,
    }),
);

export default APPConfig