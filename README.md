> Nest.js authentication with Passport. RealWorld example

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Run Locally

Install dependencies

```bash
  npm install
```

Create a `.env` from the example one and customize it with your [environment variables](#environment-variables)

```bash
  cp .env.example .env
```
Run migrations to create the DB schema

```bash
  npm run typeorm migration:run
```

Start the server

```bash
  npm run start:dev
```

## Tech Stack

**Server:** Typescript, PostgreSQL, Nest.js, TypeORM, Passport
