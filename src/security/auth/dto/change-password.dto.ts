import { IsEnum, IsNotEmpty } from 'class-validator';
import { ChangePasswordType } from 'src/security/user/enums/change-password-type.enum';

export class ChangePasswordDto {

  @IsEnum(ChangePasswordType)
  type: ChangePasswordType = ChangePasswordType.MAIL;  

  @IsNotEmpty()
  account: string;

}
