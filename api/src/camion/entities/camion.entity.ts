import { ApiProperty } from '@nestjs/swagger';
import { Incidente } from 'src/incidente/entities/incidente.entity';
import { Ruta } from 'src/ruta/entities/ruta.entity';
import { Ubicacion } from 'src/ubicacion/entities/ubicacion.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Camiones')
export class Camion {
  @ApiProperty({
    example: '5fa7bac3-b0a4-4f56-adb4-0afbcf43e832',
    description: 'UUID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '5fa7bac3',
    description: 'Numero de serie del camion',
  })
  @Column({ type: 'text', unique: true })
  no_serie: string;

  @ApiProperty({
    example: 'pl49asc',
    description: 'Placas del camion',
  })
  @Column({ type: 'text', unique: true })
  placas: string;

  @ApiProperty({
    example: 'aaadsadaasklnfvlkadkjs',
    description: 'ID de la foto del camion',
  })
  @Column({ type: 'text', unique: true })
  foto_id: string;

  @ManyToOne(() => Ruta, (ruta) => ruta.camion, {
    eager: true, //Cargar la relacion
    nullable: false,
  })
  @JoinColumn({ name: 'ruta_id', referencedColumnName: 'id' })
  ruta: Ruta;

  @ManyToOne(() => User, (user) => user.camion, {
    eager: true, //Cargar la relacion
    nullable: false,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => Ubicacion, (ubicacion) => ubicacion.camion)
  ubicacion: Ubicacion;
  
  @OneToMany(() => Incidente, (incidente) => incidente.camion)
  incidente: Incidente;

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
