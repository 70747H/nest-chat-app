## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ NODE_ENV=dev npm run migrate:all 
$ npm run start

# watch mode
$ NODE_ENV=dev npm run migrate:all 
$ npm run start:dev

# docker mode
$ docker-compose up --build

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ NODE_ENV=testing npm run migrate:all 
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API-Docs
#### Swagger API documentation at localhost:3001/docs

## Code-Docs
Run the following command and code documentation will be available at http://127.0.0.1:8080
```bash
$ npx @compodoc/compodoc -p tsconfig.json -s  
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [70747H](https://github.com/70747H)
- Website - [https://nestjs.com](https://nestjs.com/)

## License

Nest is [MIT licensed](LICENSE).
