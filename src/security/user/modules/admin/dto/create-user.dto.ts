import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength
} from 'class-validator';




export class CreateUserDto {

  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  @IsAlphanumeric('en-US', {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail(
    {
      host_whitelist: ['gmail.com']
    }, { message: 'Please provide valid Email.' }
  )
  email: string;


  @IsInt()
  age: number = 1;


  @IsString()
  @IsEnum(['f', 'm', 'u'])
  gender: string = 'u';

  @IsNotEmpty()
  @MinLength(7, { message: 'Name must have atleast 2 characters.' })
  password: string;
}