import { DataSourceOptions, DataSource } from 'typeorm';
import { Film } from './film/film.entity';
import { Profile } from './user/profile.entity';
import { User } from './user/user.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Profile, Film],
  migrations: [],
  synchronize: true,
  extra: {
    ssl:
      process.env.SSL_MODE === 'require'
        ? {
            rejectUnauthorized: false,
          }
        : false,
  },
};

export const appDataSource = new DataSource(dataSourceOptions);
