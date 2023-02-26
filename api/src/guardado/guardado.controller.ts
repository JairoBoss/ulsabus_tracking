import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GuardadoService } from './guardado.service';
import { CreateGuardadoDto } from './dto/create-guardado.dto';
import { UpdateGuardadoDto } from './dto/update-guardado.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Guardados')
@Controller('guardado')
export class GuardadoController {
  constructor(private readonly guardadoService: GuardadoService) {}

  @Post()
  create(@Body() createGuardadoDto: CreateGuardadoDto) {
    return this.guardadoService.create(createGuardadoDto);
  }

  @Get()
  findAll() {
    return this.guardadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guardadoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuardadoDto: UpdateGuardadoDto) {
    return this.guardadoService.update(+id, updateGuardadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guardadoService.remove(+id);
  }
}
