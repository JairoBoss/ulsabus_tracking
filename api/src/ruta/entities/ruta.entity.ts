import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    example: 'brenamiel_xoxo',
    description: 'Nombre de la ruta para hacer mas facil el acceso',
  })
  @Column({ type: 'text', unique: true })
  hora_inicio: string;

}
