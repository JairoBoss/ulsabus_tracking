import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RutaService } from './ruta.service';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { ApiForbiddenResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Ruta } from './entities/ruta.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Query } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/dto/valid-roles.interface';

@ApiTags('Rutas')
@Controller('ruta')
export class RutaController {
  constructor(private readonly rutaService: RutaService) {}

  @Post()
  @Auth(ValidRoles.admin)
  @ApiResponse({ status: 201, description: 'Ruta creada', type: Ruta })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createRutaDto: CreateRutaDto) {
    return this.rutaService.create(createRutaDto);
  }

  @Get()
  @Auth()
  @ApiOkResponse({ description: 'Rutas paginadas', type: Ruta, isArray: true })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.rutaService.findAll(paginationDto);
  }

  @Get(':term')
  @Auth()
  @ApiOkResponse({ description: 'Rutas encontrada por UUID, nombre o slug', type: Ruta })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findOne(@Param('term') term: string) {
    return this.rutaService.findOne(term);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  @ApiOkResponse({ description: 'Ruta actualizada por id', type: Ruta })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  update(@Param('id') id: string, @Body() updateRutaDto: UpdateRutaDto) {
    return this.rutaService.update(id, updateRutaDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  @ApiOkResponse({ description: 'Ruta eliminada por id', type: Ruta })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  remove(@Param('id') id: string) {
    return this.rutaService.remove(id);
  }
}
