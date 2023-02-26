import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateParadaDto {
  @ApiProperty({
    description: 'Nombre de la parada',
    nullable: false,
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Coordenadas de la parada',
    nullable: false,
    isArray: true,
  })
  @IsArray()
  @IsNumber({},{each:true})
  coordenadas: number[];

  @ApiProperty({
    description: 'ID de la parada',
    nullable: false,
  })
  @IsString()
  ruta_id: string;
}
