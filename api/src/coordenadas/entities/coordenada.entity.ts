import { ApiProperty } from '@nestjs/swagger';
import { Ruta } from 'src/ruta/entities/ruta.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Coordenadas')
export class Coordenada {
  @ApiProperty({
    example: '5fa7bac3-b0a4-4f56-adb4-0afbcf43e832',
    description: 'UUID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Parada de la pepsi',
    description: 'Nombre de la parada',
  })
  @Column({ type: "int" })
  no: number;

  @ApiProperty({
    example: '17.009873',
    description: 'Latitud de la estacion',
  })
  @Column('decimal')
  latitud: number;
  
  @ApiProperty({
    example: '-12.009873',
    description: 'Longitud de la estacion',
  })
  @Column('decimal')
  longitud: number;

  @ManyToOne(() => Ruta, (ruta) => ruta.parada, {
    eager: true, //Cargar la relacion
    nullable: false,
  })
  @JoinColumn({ name: 'ruta_id', referencedColumnName: 'id' })
  ruta: Ruta;
}
