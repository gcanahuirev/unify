import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { enumToString } from '~helpers';
import { Rol } from '~m/auth/app.roles';

export class CreateUserDto {
  @IsString()
  @Length(8, 20)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(8, 128)
  readonly password: string;

  @IsArray()
  @IsEnum(Rol, {
    each: true,
    message: `Must be a valid role, ${enumToString(Rol)}`,
  })
  readonly roles: Array<Rol>;

  @IsBoolean()
  @IsOptional()
  readonly isActive?: boolean;
}
