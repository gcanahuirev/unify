import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import formidable = require('formidable');
import { createReadStream } from 'fs';

import { nanoid } from '~helpers';
import { S3Service } from '~providers';

@Injectable()
export class S3SongService extends S3Service {
  constructor(readonly configService: ConfigService) {
    super(configService);
  }

  async uploadSongs(
    file: formidable.File | formidable.File[],
    userId: number,
  ): Promise<string[]> {
    const fileName = `songs/${userId}/${nanoid()}.mp3`;

    const keys: Array<string> = [];

    if (Array.isArray(file)) {
      await Promise.all(
        file.map(async (item: formidable.File) => {
          const fileStream = createReadStream(item.path);
          const key = await this.upload(fileName, 'audio/mpeg', fileStream);
          keys.push(key);
        }),
      );
    } else {
      const fileStream = createReadStream(file.path);

      const key = await this.upload(fileName, 'audio/mpeg', fileStream);
      keys.push(key);
    }

    return keys;
  }
}
