import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { writeFileSync } from 'fs';

/**
 * This script will generate the ormconfig.json based on your Global Config
 * @param config Config Service for accessing the ENV Variables
 */
const generateTypeormConfigFile = (config: ConfigService) => {
  const logger = new Logger();
  const typeormConfig = config.get('database');
  writeFileSync('ormconfig.json', JSON.stringify(typeormConfig, null, 2));

  logger.debug('Generated TypeORM Config File', 'TypeORM');
};

export { generateTypeormConfigFile };
