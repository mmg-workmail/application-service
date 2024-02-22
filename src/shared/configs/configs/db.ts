import { registerAs } from "@nestjs/config";
import { ConfigKey } from "../enum";
import { DatabaseConfig } from "../interface";

 const DBConfig = registerAs(
    ConfigKey.DB, () : DatabaseConfig => ({
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
    }),
);

export default DBConfig