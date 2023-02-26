import { Module } from '@nestjs/common';
import { UbicacionService } from './ubicacion.service';
import { UbicacionController } from './ubicacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CamionModule } from 'src/camion/camion.module';
import { Ubicacion } from './entities/ubicacion.entity';

@Module({
  controllers: [UbicacionController],
  imports: [CamionModule, TypeOrmModule.forFeature([Ubicacion])],
  providers: [UbicacionService],
})
export class UbicacionModule {}
