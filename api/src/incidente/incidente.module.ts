import { Module } from '@nestjs/common';
import { IncidenteService } from './incidente.service';
import { IncidenteController } from './incidente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CamionModule } from 'src/camion/camion.module';
import { Incidente } from './entities/incidente.entity';

@Module({
  controllers: [IncidenteController],
  imports: [CamionModule, TypeOrmModule.forFeature([Incidente])],
  providers: [IncidenteService],
})
export class IncidenteModule {}
