import { Module } from '@nestjs/common';
import { ConfigsModule } from './configs/configs.module';
import { DatabaseModule } from './database/database.module';
import { SecurityModule } from '../security/security.module';
import { CacheManagerModule } from './cache-manager/cache-manager.module';

@Module({
    imports: [ConfigsModule, DatabaseModule, SecurityModule, CacheManagerModule]
})
export class SharedModule {}
