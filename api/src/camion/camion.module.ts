import { Module } from '@nestjs/common';
import { CamionService } from './camion.service';
import { CamionController } from './camion.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RutaModule } from 'src/ruta/ruta.module';
import { UserModule } from 'src/user/user.module';
import { Camion } from './entities/camion.entity';

@Module({
  controllers: [CamionController],
  providers: [CamionService],
  imports: [
    AuthModule,
    RutaModule,
    UserModule,
    TypeOrmModule.forFeature([Camion]),
  ],
})
export class CamionModule {}
