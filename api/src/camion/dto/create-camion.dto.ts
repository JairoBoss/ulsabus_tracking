import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCamionDto {
  @ApiProperty({
    description: 'Numero de serie para el camion',
    nullable: false,
  })
  @IsString()
  no_serie: string;

  @ApiProperty({
    description: 'Placas del camion camion',
    nullable: false,
  })
  @IsString()
  placas: string;

  @ApiProperty({
    description: 'Placas del camion camion',
    nullable: false,
  })
  @IsString()
  foto_id: string;

  @ApiProperty({
    description: 'Placas del camion camion',
    nullable: false,
  })
  @IsString()
  ruta_id: string;

  @ApiProperty({
    description: 'Placas del camion camion',
    nullable: false,
  })
  @IsString()
  user_id: string;
}
