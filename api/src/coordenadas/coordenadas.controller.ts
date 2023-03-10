import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CoordenadasService } from './coordenadas.service';
import {
  CreateCoordenadaDto,
  CreateCoordenadasDto,
} from './dto/create-coordenada.dto';
import { UpdateCoordenadaDto } from './dto/update-coordenada.dto';

@Controller('coordenadas')
export class CoordenadasController {
  constructor(private readonly coordenadasService: CoordenadasService) {}

  @Post()
  create(@Body() createCoordenadasDto: CreateCoordenadasDto) {
    return this.coordenadasService.create(createCoordenadasDto);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.coordenadasService.findAllByRuta(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCoordenadaDto: UpdateCoordenadaDto,
  ) {
    return this.coordenadasService.update(id, updateCoordenadaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coordenadasService.remove(id);
  }
}
