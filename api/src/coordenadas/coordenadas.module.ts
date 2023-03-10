import { Module } from '@nestjs/common';
import { CoordenadasService } from './coordenadas.service';
import { CoordenadasController } from './coordenadas.controller';
import { RutaModule } from 'src/ruta/ruta.module';
import { Coordenada } from './entities/coordenada.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CoordenadasController],
  providers: [CoordenadasService],
  imports: [TypeOrmModule.forFeature([Coordenada]),  RutaModule]
})
export class CoordenadasModule {}
