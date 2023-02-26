import { Module } from '@nestjs/common';
import { ParadaService } from './parada.service';
import { ParadaController } from './parada.controller';
import { forwardRef } from '@nestjs/common';
import { RutaModule } from 'src/ruta/ruta.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parada } from './entities/parada.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ParadaController],
  providers: [ParadaService],
  imports: [TypeOrmModule.forFeature([Parada]), AuthModule, RutaModule]
})
export class ParadaModule {}
