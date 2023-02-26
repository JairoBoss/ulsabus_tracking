import { PartialType } from '@nestjs/swagger';
import { CreateGuardadoDto } from './create-guardado.dto';

export class UpdateGuardadoDto extends PartialType(CreateGuardadoDto) {}
