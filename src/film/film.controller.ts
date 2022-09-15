import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { FilmService } from './film.service';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SessionAuthGuard } from '../auth/guards/session-auth.guard';
import { FilmCreate } from './film-create.dto';
import { AuthUser } from '../user/user.decorator';
import { User } from '../user/user.entity';
import { Film } from './film.entity';
import { FilmUpdate } from './film-update.dto';

@Controller('film')
@UseGuards(SessionAuthGuard, JWTAuthGuard)
export class FilmController {
  constructor(private readonly service: FilmService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  createFilm(
    @Body() newFilm: FilmCreate,
    @AuthUser() user: User,
  ): Promise<Film> {
    newFilm.owner = user;

    return this.service.createFilm(newFilm);
  }

  @Get()
  listFilm(@AuthUser() user: User): Promise<Film[]> {
    return this.service.listFilm(user);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getFilm(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() user: User,
  ): Promise<Film> {
    return this.service.getFilm(id, user);
  }

  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async updateFilm(
    @Param('id', ParseIntPipe) id: number,
    @Body() updates: FilmUpdate,
    @AuthUser() user: User,
  ): Promise<Film> {
    const film = await this.service.getFilm(id, user);

    return this.service.updateFilm(film, updates);
  }

  @Delete(':id')
  async removeFilm(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() user: User,
  ): Promise<Film> {
    const film = await this.service.getFilm(id, user);

    return this.service.removeFilm(film);
  }

}
