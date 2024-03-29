import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AclModule } from './acl/acl.module';

@Module({
    imports: [UserModule, AuthModule, AclModule],
})
export class SecurityModule { }
