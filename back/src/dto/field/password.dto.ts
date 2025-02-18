import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class PasswordDto {
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @IsString({ message: 'Password must be a string' })
  password: string;
}
