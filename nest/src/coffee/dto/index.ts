// Transformer Imports
import { Type } from 'class-transformer';

// Validator Imports
import { IsOptional, IsPositive, IsString } from 'class-validator';

export class createDto {
  @IsString()
  name: string;
  @IsString()
  brand: string;
  @IsString({ each: true })
  flavors: string[];
}

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  offset: number;
}
