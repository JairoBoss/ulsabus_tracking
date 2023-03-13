import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger/dist';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/dto/valid-roles.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CamionService } from './camion.service';
import { CreateCamionDto } from './dto/create-camion.dto';
import { UpdateCamionDto } from './dto/update-camion.dto';
import { Camion } from './entities/camion.entity';

@ApiTags('Camiones')
@Controller('camion')
export class CamionController {
  constructor(private readonly camionService: CamionService) {}

  @Post()
  @Auth(ValidRoles.admin)
  @ApiResponse({ status: 201, description: 'Camion creado', type: Camion })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createCamionDto: CreateCamionDto) {
    return this.camionService.create(createCamionDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Camiones paginados',
    type: Camion,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Auth()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.camionService.findAll(paginationDto);
  }

  @ApiResponse({ status: 200, description: 'Camion obtenido por el id del chofer', type: Camion })
  @Get('chofer/:id')
  @Auth()
  findOneByChofer(@Param('id') id: string) {
    return this.camionService.findOneByChofer(id);
  }

  @ApiResponse({ status: 200, description: 'Camion obtenido por UUID, nombre o slug', type: Camion })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.camionService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(@Param('id') id: string, @Body() updateCamionDto: UpdateCamionDto) {
    return this.camionService.update(id, updateCamionDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.user)
  remove(@Param('id') id: string) {
    return this.camionService.remove(id);
  }
}
