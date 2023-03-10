import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDecimal,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateParadaDto {
  @ApiProperty({
    description: 'Nombre de la parada',
    nullable: false,
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'ID de la parada',
    nullable: false,
  })
  @IsString()
  ruta_id: string;

  @ApiProperty({
    description: 'Longitud de la estacion',
    nullable: false,
  })
  @IsDecimal()
  longitud: number;

  @ApiProperty({
    description: 'Latitud de la estacion',
    nullable: false,
  })
  @IsDecimal()
  latitud: number;
}

export class ParadaCoordenadaDto {
  @IsNumber()
  longitud: number;

  @IsNumber()
  latitud: number;

  @IsString()
  nombre: string;
}

export class CreateParadaDtoArray {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParadaCoordenadaDto)
  coordenadas: ParadaCoordenadaDto[];

  @IsString()
  ruta_id: string;
}
