import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from '@hapi/joi';
import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import IEnvConfigInterface from "../src/interfaces/env-config.interface";

@Injectable()
class ConfigService {
  private readonly envConfig: IEnvConfigInterface;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = ConfigService.validateInput(config);
  }

  public getTypeORMConfig(): TypeOrmModuleOptions {
    const baseDir = path.join(__dirname, '../');
    const entitiesPath = `${baseDir}${this.envConfig.TYPEORM_ENTITIES}`;
    const migrationPath = `${baseDir}${this.envConfig.TYPEORM_MIGRATIONS}`;
    const type: any = this.envConfig.DATABASE_TYPE;
    return {
      type,
      host: this.envConfig.DATABASE_HOST,
      username: this.envConfig.DATABASE_USER,
      password: this.envConfig.DATABASE_PASSWORD,
      database: this.envConfig.DATABASE_NAME,
      port: Number.parseInt(this.envConfig.DATABASE_PORT, 10),
      logging: false,
      entities: [entitiesPath],
      migrations: [migrationPath],
      migrationsRun: this.envConfig.TYPEORM_MIGRATIONS_RUN === 'true',
      cli: {
        migrationsDir: '/migration',
      },
    };
  }

  public getServerConfig() {
    return {
      port: Number.parseInt(this.envConfig.NODE_PORT, 10),
    }
  }

  /*
	  Ensures all needed variables are set, and returns the validated JavaScript object
	  including the applied default values.
  */
  private static validateInput(envConfig: IEnvConfigInterface): IEnvConfigInterface {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'testing')
        .default('development'),
      NODE_PORT: Joi.number().required(),
    }).unknown(true);

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}

export default ConfigService;
