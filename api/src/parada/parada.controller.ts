import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ParadaService } from './parada.service';
import { CreateParadaDto } from './dto/create-parada.dto';
import { UpdateParadaDto } from './dto/update-parada.dto';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Parada } from './entities/parada.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Query } from '@nestjs/common';

@ApiTags('Paradas')
@Controller('parada')
export class ParadaController {
  constructor(private readonly paradaService: ParadaService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Parada creada', type: Parada })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createParadaDto: CreateParadaDto) {
    return this.paradaService.create(createParadaDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Paradas paginadas',
    type: Parada,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.paradaService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Parada encontrada por UUID, nombre o slug',
    type: Parada,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findOne(@Param('id') id: string) {
    return this.paradaService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Parada actualizada por id', type: Parada })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  update(@Param('id') id: string, @Body() updateParadaDto: UpdateParadaDto) {
    return this.paradaService.update(+id, updateParadaDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Parada eliminada por id', type: Parada })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  remove(@Param('id') id: string) {
    return this.paradaService.remove(+id);
  }
}
