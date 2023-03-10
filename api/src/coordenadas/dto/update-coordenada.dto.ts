import { PartialType } from '@nestjs/swagger';
import { CreateCoordenadaDto } from './create-coordenada.dto';

export class UpdateCoordenadaDto extends PartialType(CreateCoordenadaDto) {}
