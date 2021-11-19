/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Logger } from '@nestjs/common';
import { Upload } from '@aws-sdk/lib-storage';

const logger = new Logger();

export class S3Service {
  constructor(protected readonly configService: ConfigService) {}

  private readonly s3 = new S3Client({
    region: this.configService.get<string>('s3.region'),
    credentials: {
      accessKeyId: this.configService.get<string>('s3.accessKey'),
      secretAccessKey: this.configService.get<string>('s3.secretAccessKey'),
    },
  });

  private readonly bucket = this.configService.get('s3.bucket');

  async upload(key: string, type: string, file: any): Promise<string | null> {
    try {
      const parallelUploads3 = new Upload({
        client: this.s3,
        leavePartsOnError: false,
        params: {
          Bucket: this.bucket,
          Key: key,
          Body: file,
          ContentType: type,
        },
      });

      parallelUploads3.on('httpUploadProgress', (progress) => {
        logger.debug(progress, 'AWS S3');
      });

      await parallelUploads3.done();
      return key;
    } catch (err: unknown) {
      if (err instanceof SyntaxError) logger.error(err.message, 'AWS S3');
      return null;
    }
  }

  async getUrl(key: string, expiresIn = 3600): Promise<string | null> {
    try {
      const input = {
        Bucket: this.bucket,
        Key: key,
      };
      const command = new GetObjectCommand(input);
      return getSignedUrl(this.s3, command, { expiresIn });
    } catch (err: unknown) {
      if (err instanceof SyntaxError) logger.error(err.message, 'AWS S3');
      return null;
    }
  }

  async delete(key: string): Promise<boolean | null> {
    try {
      const input = {
        Bucket: this.bucket,
        Key: key,
      };
      const command = new DeleteObjectCommand(input);
      const { DeleteMarker } = await this.s3.send(command);
      return DeleteMarker;
    } catch (err: unknown) {
      if (err instanceof SyntaxError) logger.error(err.message, 'AWS S3');
      return null;
    }
  }

  async getObject(key: string): Promise<any | null> {
    try {
      const input = {
        Bucket: this.bucket,
        Key: key,
      };

      const command = new GetObjectCommand(input);
      const { Body } = await this.s3.send(command);
      return Body;
    } catch (err: unknown) {
      if (err instanceof SyntaxError) logger.error(err.message, 'AWS S3');
      return null;
    }
  }
}
