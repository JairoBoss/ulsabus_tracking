import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

export class CreateCoordenadaDto {
  @ApiProperty({
    description: 'Numero de coordenada',
    nullable: false,
  })
  @IsNumber()
  no: number;

  @ApiProperty({
    description: 'Longitud de la coordenada',
    nullable: false,
  })
  @IsNumber()
  longitud: number;

  @ApiProperty({
    description: 'Latitud de la coordenada',
    nullable: false,
  })
  @IsNumber()
  latitud: number;

  @ApiProperty({
    description: 'ID de la parada',
    nullable: false,
  })
  @IsString()
  ruta_id: string;
}

export class CoordenadaDto {
  @IsNumber()
  longitud: number;

  @IsNumber()
  latitud: number;
}

export class CreateCoordenadasDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CoordenadaDto)
  coordenadas: CoordenadaDto[];

  @IsString()
  ruta_id: string;
}
