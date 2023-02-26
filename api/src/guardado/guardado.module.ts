import { Module } from '@nestjs/common';
import { GuardadoService } from './guardado.service';
import { GuardadoController } from './guardado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { RutaModule } from 'src/ruta/ruta.module';
import { Guardado } from './entities/guardado.entity';

@Module({
  controllers: [GuardadoController],
  imports: [UserModule, RutaModule, TypeOrmModule.forFeature([Guardado])],
  providers: [GuardadoService],
})
export class GuardadoModule {}
