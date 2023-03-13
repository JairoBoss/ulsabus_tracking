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
import { CreateParadaDto, CreateParadaDtoArray } from './dto/create-parada.dto';
import { UpdateParadaDto } from './dto/update-parada.dto';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Parada } from './entities/parada.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Query } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/dto/valid-roles.interface';

@ApiTags('Paradas')
@Controller('parada')
export class ParadaController {
  constructor(private readonly paradaService: ParadaService) {}

  @Post()
  @Auth(ValidRoles.admin)
  @ApiResponse({ status: 201, description: 'Parada creada', type: Parada })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createParadaDtoArray: CreateParadaDtoArray) {
    return this.paradaService.create(createParadaDtoArray);
  }

  @Get(':id')
  @Auth()
  @ApiOkResponse({
    description: 'Paradas por ruta',
    type: Parada,
    isArray: true,
  })
  findAll(@Param('id') id: string) {
    return this.paradaService.findAll(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  @ApiOkResponse({ description: 'Parada actualizada por id', type: Parada })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  update(@Param('id') id: string, @Body() updateParadaDto: UpdateParadaDto) {
    return this.paradaService.update(id, updateParadaDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  @ApiOkResponse({ description: 'Parada eliminada por id', type: Parada })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  remove(@Param('id') id: string) {
    return this.paradaService.remove(id);
  }
}
