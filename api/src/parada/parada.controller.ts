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
  create(@Body() createParadaDto: CreateParadaDto) {
    return this.paradaService.create(createParadaDto);
  }

  @Get()
  @Auth()
  @ApiOkResponse({
    description: 'Paradas paginadas',
    type: Parada,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.paradaService.findAll(paginationDto);
  }

  @Get(':term')
  @Auth()
  @ApiOkResponse({
    description: 'Parada encontrada por UUID, nombre o slug',
    type: Parada,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findOne(@Param('term') term: string) {
    return this.paradaService.findOne(term);
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
