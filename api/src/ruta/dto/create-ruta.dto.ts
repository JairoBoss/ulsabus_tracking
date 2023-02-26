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
    description: 'Son las coordenadas en las cuales va a empezar su ruta',
    nullable: false,
  })
  @IsString()
  inicio: string;

  @ApiProperty({
    description: 'Son las ultimas coordenadas de la ruta',
    nullable: false,
  })
  @IsString()
  fin: string;

  @ApiProperty({
    description: 'Nombre del consecionario (dueño del camion)',
    nullable: false,
  })
  @IsString()
  concesionario: string;
}
