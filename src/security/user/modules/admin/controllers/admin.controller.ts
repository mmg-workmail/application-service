  import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,

  } from '@nestjs/common';

  import { AdminService } from '../services/admin.service';
  import  { CreateUserDto } from '../dto/create-user.dto';
  import  { UpdateUserDto } from '../dto/update-user.dto';
  import { DatatableDto } from 'src/common/dto/datatable.dto';
  
  
  @Controller('admin/users')
  export class AdminController {
    constructor(private readonly adminService: AdminService) {}
  
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
      return this.adminService.create(createUserDto);
    }
  
    @Get()
    async findAll(@Query() datatableUserDto: DatatableDto ) {
      return await this.adminService.findAll(datatableUserDto);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.adminService.findOne(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.adminService.update(+id, updateUserDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.adminService.remove(+id);
    }
  }
  