// Validator Imports
import { IsOptional, IsNumber, IsPositive } from 'class-validator';

export class Rquery {
  @IsOptional()
  @IsNumber()
  readonly idx: number;
  @IsOptional()
  @IsPositive()
  readonly n: number;
}
