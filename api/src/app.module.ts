import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from './utils/logger.middleware';
import { CamionModule } from './camion/camion.module';
import { RutaModule } from './ruta/ruta.module';
import { ParadaModule } from './parada/parada.module';
import { UbicacionModule } from './ubicacion/ubicacion.module';
import { IncidenteModule } from './incidente/incidente.module';
import { GuardadoModule } from './guardado/guardado.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    SeedModule,
    CommonModule,
    CamionModule,
    RutaModule,
    ParadaModule,
    UbicacionModule,
    IncidenteModule,
    GuardadoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
