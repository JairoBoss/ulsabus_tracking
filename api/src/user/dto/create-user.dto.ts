import {
  IsArray,
  IsBoolean,
  IsDate,
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
  password: string;

  @ApiProperty({
    description: 'Nombre del usuario',
    nullable: false,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Apellido paterno',
    nullable: false,
  })
  @IsString()
  last_name: string;

  @ApiProperty({
    description: 'Apellido materno',
    nullable: false,
  })
  @IsString()
  second_last_name: string;

  @ApiProperty({
    description: 'Numero telefonico',
    nullable: false,
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Direccion',
    nullable: false,
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Fecha de nacimiento',
    nullable: false,
  })
  @IsDate()
  birth_date: string;

  @ApiProperty({
    description: 'ID del identificacion del usuario',
    nullable: false,
  })
  @IsString()
  id_card: string;

  @ApiProperty({
    description: 'Si el usuario esta activo o no',
    nullable: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @ApiProperty({
    description: "Roles del usuario ['chofer', 'user', 'admin']",
    nullable: true,
    isArray: true,
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  roles: string[];
}
