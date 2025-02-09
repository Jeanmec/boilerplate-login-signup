import { IsNotEmpty, IsEmail, MinLength, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Le nom ne peut pas être vide.' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères.' })
  @MinLength(4, { message: 'Le nom doit contenir au moins 4 caractères.' })
  name: string;

  @IsNotEmpty({ message: "L'email ne peut pas être vide." })
  @IsEmail({}, { message: "L'email doit être une adresse email valide." })
  email: string;

  @IsNotEmpty({ message: 'Le mot de passe ne peut pas être vide.' })
  @MinLength(6, {
    message: 'Le mot de passe doit contenir au moins 6 caractères.',
  })
  password: string;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
