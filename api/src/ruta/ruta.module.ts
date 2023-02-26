import { Module } from '@nestjs/common';
import { RutaService } from './ruta.service';
import { RutaController } from './ruta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ruta } from './entities/ruta.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [RutaController],
  providers: [RutaService],
  imports: [TypeOrmModule.forFeature([Ruta]), AuthModule],
  exports: [TypeOrmModule]
})
export class RutaModule {}
