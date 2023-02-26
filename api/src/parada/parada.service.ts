import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Ruta } from 'src/ruta/entities/ruta.entity';
import { Repository } from 'typeorm';
import { CreateParadaDto } from './dto/create-parada.dto';
import { UpdateParadaDto } from './dto/update-parada.dto';
import { Parada } from './entities/parada.entity';

@Injectable()
export class ParadaService {
  constructor(
    @InjectRepository(Parada)
    private readonly paradaRepository: Repository<Parada>,

    @InjectRepository(Ruta)
    private readonly rutaRepository: Repository<Ruta>,
  ) {}

  async create(createParadaDto: CreateParadaDto) {
    try {
      const { ruta_id } = createParadaDto;
      const rutaFound = await this.rutaRepository.findOneBy({ id: ruta_id });
      if (!rutaFound)
        throw new NotFoundException(`Ruta ${ruta_id} no encontrada`);

      const parada = this.paradaRepository.create({
        ruta: rutaFound,
        ...createParadaDto,
      });

      await this.paradaRepository.save(parada);

      return parada;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const [data, total] = await this.paradaRepository.findAndCount({
      take: limit,
      skip: offset,
      order: {
        createdAt: 'ASC',
      },
    });

    return { data, total };
  }

  async findOne(term: string) {
    let parada: Parada;

    if (isUUID(term)) {
      parada = await this.paradaRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.paradaRepository.createQueryBuilder('parada');
      parada = await queryBuilder
        .where('UPPER(nombre) =:nombre or slug =:slug', {
          nombre: term.toUpperCase(),
          slug: term.toLowerCase(),
        })
        .getOne();

      if (!parada) throw new NotFoundException(`Parada ${term} no encontrada`);
    }

    return parada;
  }

  async update(id: string, updateParadaDto: UpdateParadaDto) {
    const { ruta_id } = updateParadaDto;

    const ruta = await this.rutaRepository.findOneBy({ id: ruta_id });
    let paradaUpdate: Parada;

    if (!ruta) {
      paradaUpdate = await this.paradaRepository.preload({
        id: id,
        ...updateParadaDto,
      });
    } else {
      paradaUpdate = await this.paradaRepository.preload({
        id: id,
        ruta,
        ...updateParadaDto,
      });
    }
    await this.paradaRepository.save(paradaUpdate);
    
    return paradaUpdate;
  }

  async remove(id: string) {
    const { affected } = await this.paradaRepository.delete({ id });

    if (affected === 0)
      throw new BadRequestException(`Parada con id ${id} no encontrada`);

    return { message: `Parada con id: ${id} elimanada` };
  }

  private handleDBErrors(error: any): never {
    console.log(error);
    throw new InternalServerErrorException('Intentalo de nuevo mas terde');
  }
}
