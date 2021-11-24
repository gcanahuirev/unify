import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(8, 20)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(8, 128)
  readonly password: string;
}
