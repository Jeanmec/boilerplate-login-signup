import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class NameDto {
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  @IsString({ message: 'Name must be a string.' })
  @MinLength(4, { message: 'Name must be at least 4 characters.' })
  name: string;
}
