import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  
  @ApiProperty({
    description: 'Correo del usuario',
    nullable: false,
    minLength: 1,
  })
  @IsEmail({}, { message: 'Debes de colocar un correo' })
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    nullable: false,
    minLength: 6,
    maxLength: 50,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe de tener una mayuscula, minuscula y un numero',
  })
  password: string;
}
