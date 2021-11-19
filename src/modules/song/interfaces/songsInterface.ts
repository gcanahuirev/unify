import { Song } from '../entities';

export interface SongsInterface {
  page: number;
  total: number;
  rows: Array<Song>;
}
