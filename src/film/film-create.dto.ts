import { IsDefined, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';

import { User } from '../user/user.entity';

export class FilmCreate {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @Exclude()
  owner: User;
}
