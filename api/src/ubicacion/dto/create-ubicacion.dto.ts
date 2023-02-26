import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUbicacionDto {
  @ApiProperty({
    description: 'Coordenadas de la ubicacion',
    nullable: false,
  })
  @IsString()
  coordenadas: string;

  @ApiProperty({
    description: 'ID del camion',
    nullable: false,
  })
  @IsString()
  camion_id: string;
}
