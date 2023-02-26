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

@Entity('Paradas')
export class Parada {
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
  @Column({ type: 'text' })
  nombre: string;

  @ApiProperty({
    example: 'parada_de_la_pepsi',
    description: 'Nombre de la parada para hacer mas facil el acceso',
  })
  @Column({ type: 'text', unique: true })
  slug: string;

  @ApiProperty({
    example: '[60,20]',
    description: 'Coordenadas de la parada',
  })
  @Column('text', { array: true })
  coordenadas: number[];

  // @ApiProperty({type: Ruta})
  @ManyToOne(() => Ruta, (ruta) => ruta.parada, {
    eager: true, //Cargar la relacion
    nullable: false,
  })
  @JoinColumn({ name: 'ruta_id', referencedColumnName: 'id' })
  ruta: Ruta;

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
