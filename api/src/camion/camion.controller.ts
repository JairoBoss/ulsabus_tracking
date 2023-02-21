import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist';
import { ApiResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/dto/valid-roles.interface';
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
  @Auth(ValidRoles.chofer)
  findAll() {
    return this.camionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.camionService.findOne(+id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(@Param('id') id: string, @Body() updateCamionDto: UpdateCamionDto) {
    return this.camionService.update(+id, updateCamionDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.user)
  remove(@Param('id') id: string) {
    return this.camionService.remove(+id);
  }
}
