import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRutaDto {
  @ApiProperty({
    description: 'Nombre de la ruta',
    nullable: false,
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Es la hora a la cual parte el camion',
    nullable: false,
  })
  @IsString()
  hora_salida: string;

  @ApiProperty({
    description: 'Detalle de la ruta',
    nullable: true,
  })
  @IsString()
  detalle: string;

  @ApiProperty({
    description: 'Nombre del consecionario (dueño del camion)',
    nullable: false,
  })
  @IsString()
  concesionario: string;
}
