import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Film } from './film.entity';
import { FilmCreate } from './film-create.dto';
import { User } from '../user/user.entity';
import { FilmUpdate } from './film-update.dto';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private readonly repo: Repository<Film>,
  ) {}

  createFilm(newFilm: FilmCreate): Promise<Film> {
    const film = this.repo.create(newFilm);

    return this.repo.save(film);
  }

  listFilm(owner: User): Promise<Film[]> {
    return this.repo.find({
      where: { owner: { id: owner.id } },
      order: { createdAt: 'DESC' },
    });
  }

  async getFilm(id: number, owner: User): Promise<Film> {
    const film = await this.repo.findOne({
      where: { id },
      loadRelationIds: true,
    });

    if (!film) throw new NotFoundException(`Not found any film with id: ${id}`);
    if (film.owner !== owner.id)
      throw new ForbiddenException(`Film does not belong to you`);

    return film;
  }

  updateFilm(film: Film, updates: FilmUpdate): Promise<Film> {
    this.repo.merge(film, updates);

    return this.repo.save(film);
  }

  removeFilm(film: Film): Promise<Film> {
    return this.repo.remove(film);
  }
}
