import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Ruta } from 'src/ruta/entities/ruta.entity';
import { S3Service } from 'src/s3/s3.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCamionDto } from './dto/create-camion.dto';
import { UpdateCamionDto } from './dto/update-camion.dto';
import { Camion } from './entities/camion.entity';

@Injectable()
export class CamionService {
  constructor(
    @InjectRepository(Camion)
    private readonly camionRepository: Repository<Camion>,

    @InjectRepository(Ruta)
    private readonly rutaRepository: Repository<Ruta>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly s3Service: S3Service,
  ) {}

  async create(createCamionDto: CreateCamionDto) {
    try {
      const { user_id, ruta_id } = createCamionDto;

      const ruta = await this.rutaRepository.findOneBy({ id: ruta_id });
      const usuario = await this.userRepository.findOneBy({ id: user_id });

      if (!ruta) throw new NotFoundException('Ruta no encontrada');

      if (!usuario) throw new NotFoundException('Usuario no encontrado');

      if (!usuario.roles.includes('chofer'))
        throw new BadRequestException('Usuario no tiene el rol de chofer');

      const nuevaRuta = this.camionRepository.create({
        user: usuario,
        ruta: ruta,
        ...createCamionDto,
      });

      await this.camionRepository.save(nuevaRuta);

      return nuevaRuta;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const [data, total] = await this.camionRepository.findAndCount({
      take: limit,
      skip: offset,
      order: {
        createdAt: 'ASC',
      },
    });

    const dataWithImageUrl = await Promise.all(
      data.map(async (item) => {
        const imageUrl = await this.s3Service.getSignedUrl(item.foto_id);
        return {
          ...item,
          imageUrl,
        };
      }),
    );

    return { dataWithImageUrl, total };
  }

  async findOne(id: string) {
    const camion = await this.camionRepository.findOneBy({ id });

    if (!camion) throw new NotFoundException(`Camion no encontrada`);

    return camion;
  }

  async update(id: string, updateCamionDto: UpdateCamionDto) {
    const { ruta_id, user_id } = updateCamionDto;

    const ruta = await this.rutaRepository.findOneBy({ id: ruta_id });
    const user = await this.userRepository.findOneBy({ id: user_id });
    let camionUpdate: Camion;
    if (!ruta && !user) {
      camionUpdate = await this.camionRepository.preload({
        id: id,
        ...updateCamionDto,
      });
    } else {
      if (user) {
        if (!user.roles.includes('chofer'))
          throw new BadRequestException('Usuario no tiene el rol de chofer');

        if (user && ruta) {
          camionUpdate = await this.camionRepository.preload({
            id: id,
            user,
            ruta,
            ...updateCamionDto,
          });
        } else {
          camionUpdate = await this.camionRepository.preload({
            id: id,
            user,
            ...updateCamionDto,
          });
        }
      } else {
        camionUpdate = await this.camionRepository.preload({
          id: id,
          ruta,
          ...updateCamionDto,
        });
      }
    }

    await this.camionRepository.save(camionUpdate);

    return camionUpdate;
  }

  async remove(id: string) {
    const { affected } = await this.camionRepository.delete({ id });

    if (affected === 0) throw new BadRequestException(`Camion no encontrado`);

    return { message: `Camion con id: ${id} elimanado` };
  }

  private handleDBErrors(error: any): never {
    if (error.code === '22P02') throw new BadRequestException(error.detail);
    console.log(error);

    throw new InternalServerErrorException('Intentalo de nuevo mas terde');
  }
}
