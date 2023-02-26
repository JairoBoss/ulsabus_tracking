import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Camion } from 'src/camion/entities/camion.entity';
import { Guardado } from 'src/guardado/entities/guardado.entity';
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

@Entity()
export class User {
  @ApiProperty({
    example: '5fa7bac3-b0a4-4f56-adb4-0afbcf43e832',
    description: 'UUID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'tucorreo@gmail.com',
    description: 'Correo del usuario',
  })
  @Column({ type: 'text', unique: true })
  email: string;

  @ApiProperty({
    example: '123',
    description: 'Contraseña del usuario',
    nullable: true,
  })
  @Column({ type: 'text', select: false })
  password: string;

  @ApiProperty({
    example: 'Luis Felipe',
    description: 'Nombre (s)',
    nullable: false,
  })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({
    example: 'Martinez',
    description: 'Apellido paterno',
    nullable: false,
  })
  @Column({ type: 'text' })
  last_name: string;

  @ApiProperty({
    example: 'Portillo',
    description: 'Apellido materno',
    nullable: false,
  })
  @Column({ type: 'text' })
  second_last_name: string;

  @ApiProperty({
    example: '+52-951-426-98-83',
    description: 'Numero telefonico del usuario',
    nullable: false,
  })
  @Column({ type: 'text' })
  phone: string;

  @ApiProperty({
    example: 'Av. siempre viva, Colonia Benito Camela, No 666, CP. 801',
    description: 'Direccion del usuaio',
    nullable: true,
  })
  @Column({ type: 'text' })
  address: string;

  @ApiProperty({
    example: '01-08-2001',
    description: 'Fecha de nacimiento del usuario',
    nullable: true,
  })
  @Column({ type: 'date' })
  birth_date: Date;

  @ApiProperty({
    example: '46402c89749d53f7b6fb35bb8095bc31',
    description: 'ID de la foto de la identificacion usuario',
    nullable: true,
  })
  @Column({ type: 'text' })
  id_card: String;

  @ApiProperty({
    example: 'true or false',
    description: 'Booleano',
  })
  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @ApiProperty({
    example: '[user]',
    description:
      "Roles que el usuario tenga, pueden ser 3 ['chofer', 'user', 'admin']",
    nullable: true,
  })
  @Column({ type: 'text', array: true, default: ['user'] })
  roles: string[];

  @OneToMany(() => Camion, (camion) => camion.ruta)
  camion: Camion;

  @OneToMany(() => Guardado, (guardado) => guardado.user)
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
  checkEmail() {
    this.email = this.email.toLocaleLowerCase().trim();
  }

  @BeforeUpdate()
  checkEmailUpadte() {
    this.checkEmail();
  }
}
