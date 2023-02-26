import { Injectable } from '@nestjs/common';
import { CreateGuardadoDto } from './dto/create-guardado.dto';
import { UpdateGuardadoDto } from './dto/update-guardado.dto';

@Injectable()
export class GuardadoService {
  create(createGuardadoDto: CreateGuardadoDto) {
    return 'This action adds a new guardado';
  }

  findAll() {
    return `This action returns all guardado`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guardado`;
  }

  update(id: number, updateGuardadoDto: UpdateGuardadoDto) {
    return `This action updates a #${id} guardado`;
  }

  remove(id: number) {
    return `This action removes a #${id} guardado`;
  }
}
