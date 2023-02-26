import { PartialType } from '@nestjs/swagger/dist/type-helpers';
import { CreateRutaDto } from './create-ruta.dto';

export class UpdateRutaDto extends PartialType(CreateRutaDto) {}
