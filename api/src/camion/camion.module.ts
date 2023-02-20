import { Module } from '@nestjs/common';
import { CamionService } from './camion.service';
import { CamionController } from './camion.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CamionController],
  providers: [CamionService],
  imports: [AuthModule]
})
export class CamionModule {}
