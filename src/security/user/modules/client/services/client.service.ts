import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/security/user/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '../dto/register-user.dto';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
      ) {}
      async register(createUserDto: RegisterUserDto): Promise<User>  {
        const user: User = new User();
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        user.age = createUserDto.age;
        user.email = createUserDto.email;
        user.username = createUserDto.username;
        user.password = await user.bcryptPassword(createUserDto.password);
        user.gender = createUserDto.gender;
    
        return this.usersRepository.save(user);
      }
      
      async findOne(id: number): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { id } });
      }
      async findByUsername(username: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { username } });
      }
}
