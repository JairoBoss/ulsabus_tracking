import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';

@Injectable()
export class RutaService {
  create(createRutaDto: CreateRutaDto) {
    return 'This action adds a new ruta';
  }

  findAll(paginationDto: PaginationDto) {
    return `This action returns all ruta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ruta`;
  }

  update(id: number, updateRutaDto: UpdateRutaDto) {
    return `This action updates a #${id} ruta`;
  }

  remove(id: number) {
    return `This action removes a #${id} ruta`;
  }
}
