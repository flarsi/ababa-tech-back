import {
  IsOptional,
  IsString,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class FilmUpdate {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description?: string;
}
