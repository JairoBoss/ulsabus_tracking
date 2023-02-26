import { ApiProperty } from '@nestjs/swagger';
import { Ruta } from 'src/ruta/entities/ruta.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Guardados')
export class Guardado {
  @ApiProperty({
    example: '5fa7bac3-b0a4-4f56-adb4-0afbcf43e832',
    description: 'UUID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ApiProperty({type: Ruta})
  @ManyToOne(() => Ruta, (ruta) => ruta.guardado, {
    eager: true, //Cargar la relacion
    nullable: false,
  })
  @JoinColumn({ name: 'ruta_id', referencedColumnName: 'id' })
  ruta: Ruta;

  @ManyToOne(() => User, (user) => user.guardado, {
    eager: true, //Cargar la relacion
    nullable: false,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
