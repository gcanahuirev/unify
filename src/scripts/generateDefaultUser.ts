import { ConfigService } from '@nestjs/config';
import { getRepository } from 'typeorm';
import { Logger } from '@nestjs/common';

import { User } from '~m/user/entities';

// eslint-disable-next-line consistent-return
const generateDefaultUser = async (config: ConfigService) => {
  const logger = new Logger();
  const userRepository = getRepository<User>(User);

  const defaultUser = await userRepository
    .createQueryBuilder()
    .where('email = :email', {
      email: config.get<string>('defaultUser.email'),
    })
    .getOne();

  if (!defaultUser) {
    const adminUser = userRepository.create(config.get('defaultUser'));

    await userRepository.save(adminUser);
    logger.debug(
      `Default user created: ${config.get<string>('defaultUser.email')}`,
      'GenerateDefaultUser',
    );
  }
};

export { generateDefaultUser };
