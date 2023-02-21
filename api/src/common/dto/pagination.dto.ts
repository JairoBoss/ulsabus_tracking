import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class PaginationDto {
  @ApiProperty({
    default: 10,
    description: 'Cuantos registros necesitas?',
  })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Type(() => Number) // Esto no lo pondriamos si hubieramos puesto el enableImplicitiConversions en el main.ts
  limit?: number;

  @ApiProperty({
    default: 0,
    description: 'Cuantos registros quieres saltar?',
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}
