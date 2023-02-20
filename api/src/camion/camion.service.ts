import { Injectable } from '@nestjs/common';
import { CreateCamionDto } from './dto/create-camion.dto';
import { UpdateCamionDto } from './dto/update-camion.dto';

@Injectable()
export class CamionService {
  create(createCamionDto: CreateCamionDto) {
    return 'This action adds a new camion';
  }

  findAll() {
    return `This action returns all camion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} camion`;
  }

  update(id: number, updateCamionDto: UpdateCamionDto) {
    return `This action updates a #${id} camion`;
  }

  remove(id: number) {
    return `This action removes a #${id} camion`;
  }
}
