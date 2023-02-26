import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateIncidenteDto {
  @ApiProperty({
    description: 'Tipo de incidente que ocurrio',
    nullable: false,
  })
  @IsString()
  tipo: string;

  @ApiProperty({
    description: 'Coordenadas de donde ocurrio',
    nullable: false,
  })
  @IsString()
  coordenadas: string;

  @ApiProperty({
    description: 'ID de la foto',
    nullable: false,
  })
  @IsString()
  foto_id: string;

  @ApiProperty({
    description: 'Breve descripcion de lo que ocurrio ',
    nullable: false,
  })
  @IsString()
  descripcion: string;

  @ApiProperty({
    description: 'ID del camion',
    nullable: false,
  })
  @IsString()
  camion_id: string;
}
