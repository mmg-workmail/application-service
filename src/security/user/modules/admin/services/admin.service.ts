import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../../../entities/user.entity';
import { FilterDatatable } from 'src/common/helpers/datatable/filterDatatable.helper';
import { DatatableDto } from 'src/common/dto/datatable.dto';
import { DatatableResponse } from 'src/common/interfaces/datatable.interface';


@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User>  {
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

  async findAll(datatableUserDto: DatatableDto): Promise<DatatableResponse<User>> {
    const filterDatatable = new FilterDatatable(datatableUserDto);
    filterDatatable.setQuery();

    const [result, total] = await this.usersRepository.findAndCount(filterDatatable.getQuery());
    return {
      total,
      items: result,
      page : +datatableUserDto.page,
      limit : +datatableUserDto.limit,
    }
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.age = updateUserDto.age;
    user.email = updateUserDto.email;
    user.username = updateUserDto.username;
    if(updateUserDto.password) {
      user.password = await user.bcryptPassword(updateUserDto.password);
    }
    user.id = id;
    return this.usersRepository.save(user);
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.usersRepository.delete(id);
  }
}
