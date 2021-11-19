import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSongDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  readonly songFile: any;

  @IsNotEmpty()
  @IsString({ message: 'The name field must be string' })
  readonly name: string;

  @IsOptional()
  @IsString({ message: 'Gender field must be string' })
  readonly gender: string;
}
