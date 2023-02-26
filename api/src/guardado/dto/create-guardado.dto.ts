import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGuardadoDto {
  @ApiProperty({
    description: 'Ruta seleccionada por el usuario',
    nullable: false,
  })
  @IsString()
  ruta_id: string;

  @ApiProperty({
    description: 'Usuario',
    nullable: false,
  })
  @IsString()
  user_id: string;
}
