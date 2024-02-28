import { Controller, Post, Body } from '@nestjs/common';

import { ClientService } from '../services/client.service';
import { RegisterUserDto } from '../dto/register-user.dto';

@Controller('client/users/register')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}


    @Post()
    create(@Body() createUserDto: RegisterUserDto) {
      return this.clientService.register(createUserDto);
    }
}
