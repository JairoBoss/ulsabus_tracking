import { ApiProperty } from '@nestjs/swagger';
import { Camion } from 'src/camion/entities/camion.entity';
import { Ruta } from 'src/ruta/entities/ruta.entity';
import { User } from 'src/user/entities/user.entity';
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

@Entity('Ubicaciones')
export class Ubicacion {
  @ApiProperty({
    example: '5fa7bac3-b0a4-4f56-adb4-0afbcf43e832',
    description: 'UUID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '80,20',
    description: 'Coordenadas de la ubicacion',
  })
  @Column({ type: 'text' })
  coordenadas: string;

  @ManyToOne(() => Camion, (camion) => camion.ubicacion, {
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
