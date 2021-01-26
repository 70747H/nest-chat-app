import {Logger} from '@nestjs/common';
import {ValidationPipe} from '@nestjs/common/pipes';
import {NestFactory} from '@nestjs/core';
import {SwaggerModule} from '@nestjs/swagger';
import {AppModule} from './app.module';
import {swaggerOptions} from './options/swagger.options';
import ConfigService from "../config/config.service";

/*
* */

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  // app.enableCors({origin: configService.get('origin')});
  const logger = new Logger();
  app.useGlobalPipes(
    /**
     * Reference: https://docs.nestjs.com/techniques/validation#auto-validation
     */
    new ValidationPipe({
      // Make sure that there's no unexpected data
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,

      /**
       * Detailed error messages since this is 4xx
       */
      disableErrorMessages: false,

      validationError: {
        /**
         * WARNING: Avoid exposing the values in the error output (could leak sensitive information)
         */
        value: false,
      },

      /**
       * Transform the JSON into a class instance when possible.
       * Depends on the type of the data on the controllers
       */
      transform: true,
    }),
  );
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);
  const port = configService.getServerConfig().port;
  await app.listen(port);
  logger.log(`App is listening on port: ${port}.`);
}

bootstrap();
