import { Module } from '@nestjs/common';
import { AccessContorlService } from './services/access-control.service';
import { RoleGuard } from './guards/role.guard';

@Module({
    providers: [
        AccessContorlService,
        RoleGuard
    ],
    exports: [
        AccessContorlService,
        RoleGuard
    ]
})
export class AclModule {}
