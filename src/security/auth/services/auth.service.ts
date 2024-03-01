import { Injectable } from '@nestjs/common';
import { ClientService as UserClientService } from 'src/security/user/modules/client/services/client.service';

@Injectable()
export class AuthService {
    constructor(private userClientService: UserClientService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userClientService.findByUsername(username);
        if (user && user.validatePassword(pass)) {
          const { password, ...result } = user;
          return result;
        }
        return null;
    }

}
