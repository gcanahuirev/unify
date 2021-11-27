/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';

import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import fastify = require('fastify');
import { kIsMultipart } from 'fastify-formidable';
import formidable = require('formidable');

import { CreateSongDto, UpdateSongDto } from './dto';
import { SongService } from './song.service';

@ApiTags('Songs routes')
@Controller('songs')
export class SongController {
  constructor(private readonly songsService: SongService) {}

  @Post(':userId')
  @ApiBody({ type: CreateSongDto })
  @ApiConsumes('multipart/form-data')
  async createBatch(
    @Param('userId', ParseIntPipe) userId: number,
    @Req() req: fastify.FastifyRequest,
    @Res() res: fastify.FastifyReply,
  ) {
    if (req[kIsMultipart] === false) {
      res.send(new BadRequestException('Expected multipart/form-data'));
      return;
    }
    await req.parseMultipart();

    const { files } = req;

    const body = req.body as CreateSongDto;
    const file = files.songFile as formidable.File;

    const data = await this.songsService.createSong(file, body, userId);

    res.status(201).send({
      message: 'Song uploaded successfully',
      data,
    });
  }

  @Get(':userId')
  @ApiOkResponse({ type: CreateSongDto })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  async findAll(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const data = await this.songsService.findAll(userId, page, limit);

    return {
      message: 'Songs find successfully',
      data,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() update: UpdateSongDto,
  ) {
    const data = await this.songsService.update(id, update);
    return {
      message: 'Song has been successfully updated',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.songsService.remove(id);

    return {
      message: 'Song deleted successfully',
      data,
    };
  }

  @Post('file')
  @ApiQuery({ name: 'key', type: 'string', required: true })
  async getFile(@Query('key') key: string) {
    const data = await this.songsService.getFile(key);

    return {
      message: 'File found successfully',
      data,
    };
  }
}
