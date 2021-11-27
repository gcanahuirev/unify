import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeepPartial, Repository } from 'typeorm';
import formidable = require('formidable');

import { CreateSongDto, UpdateSongDto } from './dto';
import { S3SongService } from '~m/song/providers';
import { Song } from '~m/song/entities';
import { SongsInterface } from '~m/song/interfaces';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
    private readonly s3SongService: S3SongService,
  ) {}

  async createSong(
    file: formidable.File | formidable.File[],
    dto: CreateSongDto,
    userId: number,
  ): Promise<DeepPartial<Song>> {
    const key = await this.s3SongService.uploadSongs(file, userId);
    const data = { ...dto, path: key[0], userId };
    const newSong = this.songRepository.create(data);

    return this.songRepository.save(newSong);
  }

  async findOneById(id: number): Promise<Song> {
    const song = await this.songRepository.findOne(id);
    const url = await this.s3SongService.getUrl(song.path);
    song.path = url;
    return song;
  }

  async findAll(
    userId: number,
    page?: number,
    limit?: number,
  ): Promise<SongsInterface> {
    const take = limit ?? 10;
    const skip = take * (page - 1) ?? 0;
    const [data, total] = await this.songRepository.findAndCount({
      where: { userId },
      take,
      skip,
    });

    return {
      page: Number(page) || 1,
      total,
      rows: data,
    };
  }

  async findAllByUser(userId: number): Promise<Song[]> {
    const data = await this.songRepository.find({
      where: { company: { id: userId } },
    });

    if (data.length === 0) throw new NotFoundException('User not found');
    return data;
  }

  async update(id: number, dto: UpdateSongDto): Promise<Song> {
    const song = await this.findOneById(id);
    if (!song) throw new NotFoundException('Song not found');

    const editedSong = Object.assign(song, dto);
    return this.songRepository.save(editedSong);
  }

  async remove(id: number): Promise<Song> {
    const song = await this.findOneById(id);
    if (!song) throw new NotFoundException('Song not found');
    return this.songRepository.remove(song);
  }

  async getFile(key: string): Promise<any> {
    const data = await this.s3SongService.getUrl(key);
    return data;
  }
}
