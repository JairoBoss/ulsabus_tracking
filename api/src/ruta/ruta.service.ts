import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { Ruta } from './entities/ruta.entity';

@Injectable()
export class RutaService {
  constructor(
    @InjectRepository(Ruta)
    private readonly rutaRepository: Repository<Ruta>,
  ) {}

  async create(createRutaDto: CreateRutaDto) {
    try {
      const ruta = this.rutaRepository.create({
        ...createRutaDto,
      });

      await this.rutaRepository.save(ruta);

      return ruta;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const [data, total] = await this.rutaRepository.findAndCount({
      take: limit,
      skip: offset,
      order: {
        createdAt: 'ASC',
      },
    });

    return { data, total };
  }

  async findOne(term: string) {
    let ruta: Ruta;

    if (isUUID(term)) {
      ruta = await this.rutaRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.rutaRepository.createQueryBuilder('ruta');
      ruta = await queryBuilder
        .where('UPPER(nombre) =:nombre or slug =:slug', {
          nombre: term.toUpperCase(),
          slug: term.toLowerCase(),
        })
        .getOne();

      if (!ruta) throw new NotFoundException(`Ruta ${term} no encontrada`);
    }

    return ruta;
  }

  async update(id: string, updateRutaDto: UpdateRutaDto) {
    const ruta = await this.rutaRepository.preload({
      id: id,
      ...updateRutaDto,
    });

    if (!ruta) throw new NotFoundException(`Ruta con id ${id} no encontrada`);

    await this.rutaRepository.save(ruta);

    return ruta;
  }

  async remove(id: string) {
    const { affected } = await this.rutaRepository.delete({ id });

    if (affected === 0)
      throw new BadRequestException(`Ruta con id ${id} no encontrada`);

    return { message: `Ruta con id: ${id} elimanada` };
  }

  private handleDBErrors(error: any): never {
    console.log(error);

    throw new InternalServerErrorException('Intentalo de nuevo mas terde');
  }
}
