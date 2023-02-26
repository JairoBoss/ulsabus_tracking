import { Module } from '@nestjs/common';
import { ParadaService } from './parada.service';
import { ParadaController } from './parada.controller';
import { forwardRef } from '@nestjs/common';
import { RutaModule } from 'src/ruta/ruta.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parada } from './entities/parada.entity';

@Module({
  controllers: [ParadaController],
  providers: [ParadaService],
  imports: [TypeOrmModule.forFeature([Parada]),]
})
export class ParadaModule {}
