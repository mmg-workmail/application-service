import { registerAs } from "@nestjs/config";
import { ConfigKey } from "../enum";
import { CacheManager } from "../interface";

 const CacheManagerConfig = registerAs(
    ConfigKey.CACHE_MANAGER, () : CacheManager => ({
      host: process.env.CACHE_HOST,
      port: Number(process.env.CACHE_PORT)
    }),
);

export default CacheManagerConfig