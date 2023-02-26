import { ApiProperty } from '@nestjs/swagger';
import { Camion } from 'src/camion/entities/camion.entity';
import { Guardado } from 'src/guardado/entities/guardado.entity';
import { Parada } from 'src/parada/entities/parada.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Rutas')
export class Ruta {
  @ApiProperty({
    example: '5fa7bac3-b0a4-4f56-adb4-0afbcf43e832',
    description: 'UUID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Ruta brenamiel',
    description: 'Nombre de la ruta',
  })
  @Column({ type: 'text', unique: true })
  nombre: string;

  @ApiProperty({
    example: 'brenamiel_xoxo',
    description: 'Nombre de la ruta para hacer mas facil el acceso',
  })
  @Column({ type: 'text', unique: true })
  slug: string;

  @ApiProperty({
    example: '06:00 AM',
    description: 'Hora de inicio de la ruta',
  })
  @Column({ type: 'text' })
  hora_salida: string;

  @ApiProperty({
    example: '20, 90',
    description: 'Coordenadas de inicio de la ruta',
  })
  @Column({ type: 'text' })
  inicio: string;

  @ApiProperty({
    example: '90, 100',
    description: 'Ultima parada del camion',
  })
  @Column({ type: 'text' })
  fin: string;

  @ApiProperty({
    example: 'UlsaBus Oaxaca',
    description: 'Consecionario dueño del camion ',
  })
  @Column({ type: 'text' })
  concesionario: string;

  @OneToMany(() => Parada, (parada) => parada.ruta)
  parada: Parada;
  
  @OneToMany(() => Camion, (camion) => camion.ruta)
  camion: Camion;

  @OneToMany(() => Guardado, (guardado) => guardado.ruta)
  guardado: Guardado;

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

  @BeforeInsert()
  checkData() {
    this.nombre = this.nombre.trim();

    if (!this.slug) {
      this.slug = this.nombre;
    }

    this.slug = this.nombre
      .toLocaleLowerCase()
      .replaceAll("'", '')
      .replaceAll(' ', '_');
  }

  @BeforeUpdate()
  checkEmailUpadte() {
    this.checkData();
  }
}
