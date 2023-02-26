import { ApiProperty } from '@nestjs/swagger';
import { Camion } from 'src/camion/entities/camion.entity';
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

@Entity('Incidentes')
export class Incidente {
  @ApiProperty({
    example: '5fa7bac3-b0a4-4f56-adb4-0afbcf43e832',
    description: 'UUID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // TODO: Ver que hacer con esto, si hacerlo enum o tabla
  @ApiProperty({
    example: 'Choque, Marcha, Random',
    description: 'Tipo de incidente que ocurrio',
  })
  @Column({ type: 'text' })
  tipo: string;

  @ApiProperty({
    example: '80,90',
    description: 'Coordenadas donde ocurrio el percance',
  })
  @Column({ type: 'text' })
  coordenadas: string;

  @ApiProperty({
    example: '0afbcf43e832',
    description: 'ID de la foto',
  })
  @Column({ type: 'text' })
  foto_id: string;

  @ApiProperty({
    example: 'Hubo un ta,ta,ta',
    description: 'Descripcion del incidente',
  })
  @Column({ type: 'text' })
  descripcion: string;
  
  @ManyToOne(() => Camion, (camion) => camion.incidente, {
    eager: true, //Cargar la relacion
    nullable: false,
  })
  @JoinColumn({ name: 'camion_id', referencedColumnName: 'id' })
  camion: Camion;

  @ApiProperty({
    example: '2023-02-14 16:28:47',
    description: 'Fecha de creacion',
    nullable: true,
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2023-02-14 16:28:47',
    description: 'Fecha de actualizacion',
    nullable: true,
  })
  @UpdateDateColumn()
  updateAt: Date;
}
