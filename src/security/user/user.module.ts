import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { ClientModule } from './modules/client/client.module';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([User]), AdminModule, ClientModule]
})
export class UserModule {}
