import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class EmailVerificationCodeDto {
  @IsNotEmpty({ message: 'Code cannot be empty' })
  @IsString({ message: 'Code must be a string' })
  @MinLength(8, { message: 'Code must be at least 8 characters long' })
  code: string;
}
