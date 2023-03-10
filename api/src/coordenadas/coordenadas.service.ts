import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ruta } from 'src/ruta/entities/ruta.entity';
import { Repository } from 'typeorm';
import {
  CreateCoordenadaDto,
  CreateCoordenadasDto,
} from './dto/create-coordenada.dto';
import { UpdateCoordenadaDto } from './dto/update-coordenada.dto';
import { Coordenada } from './entities/coordenada.entity';

@Injectable()
export class CoordenadasService {
  constructor(
    @InjectRepository(Coordenada)
    private readonly coordenadasRepository: Repository<Coordenada>,

    @InjectRepository(Ruta)
    private readonly rutaRepository: Repository<Ruta>,
  ) {}

  async create(createCoordenadasDto: CreateCoordenadasDto) {
    const { coordenadas, ruta_id } = createCoordenadasDto;

    const rutaFound = await this.rutaRepository.findOneBy({ id: ruta_id });

    if (!rutaFound) throw new BadRequestException('Ruta no encontrada');

    const nuevasCoordenadas = coordenadas.map((coordenada, index) =>
      this.coordenadasRepository.create({
        no: index + 1,
        ruta: rutaFound,
        ...coordenada,
      }),
    );

    await this.coordenadasRepository.save(nuevasCoordenadas);

    return { message: 'Coordenadas creadas con exito' };
  }

  async findAllByRuta(id: string) {
    const rutaFound = await this.rutaRepository.findOneBy({ id });

    if (!rutaFound) throw new BadRequestException('Ruta no encontrada');

    const coordenadas = await this.coordenadasRepository.find({
      where: { ruta: { id } },
    });

    return coordenadas;
  }

  update(id: string, updateCoordenadaDto: UpdateCoordenadaDto) {
    return `This action updates a #${id} coordenada`;
  }

  remove(id: string) {
    return `This action removes a #${id} coordenada`;
  }
}
