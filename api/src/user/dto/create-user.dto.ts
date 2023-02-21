import {
  IsArray,
  isEmail,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Correo del usuario',
    nullable: false,
    minLength: 1,
  })
  @IsEmail()
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
  // @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message:
  //     'The password must have a Uppercase, lowercase letter and a number',
  // })
  password: string;

  @ApiProperty({
    description: 'Nombre del usuario',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  fullName: string;

  @ApiProperty({
    description: "Roles del usuario ['chofer', 'user', 'admin']",
    nullable: true,
    isArray: true,
  })
  @IsString({ each: true })
  @IsArray()
  // @IsIn(['chofer', 'user', 'admin'])
  @IsOptional()
  roles: string[];
}
