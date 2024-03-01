import { CacheModuleAsyncOptions } from "@nestjs/cache-manager";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";
import { ConfigKey } from "src/shared/configs/enum";
import { CacheManager } from "src/shared/configs/interface";

export const RedisOptions: CacheModuleAsyncOptions = {
    isGlobal: true,
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
        const cacheManagerConfig = configService.get<CacheManager>(ConfigKey.CACHE_MANAGER)
        const store = await redisStore({
            socket: {
                host: cacheManagerConfig.host,
                port: cacheManagerConfig.port,
            },
        });
        return {
            store: () => store,
        };
    },
    inject: [ConfigService],
};