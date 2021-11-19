import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Song } from '~m/song/entities';
import { SongController } from '~m/song/song.controller';
import { SongService } from '~m/song/song.service';

import { S3SongService } from '~m/song/providers';

@Module({
  imports: [TypeOrmModule.forFeature([Song])],
  controllers: [SongController],
  providers: [SongService, S3SongService],
})
export class SongModule {}
