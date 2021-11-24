/* eslint-disable no-shadow */
import { RolesBuilder } from 'nest-access-control';

export const roles: RolesBuilder = new RolesBuilder();

export enum Rol {
  USER = 'user',
  ARTIST = 'artist',
  ADMIN = 'admin',
}

export enum Resource {
  USER = 'user',
}

roles
  // User  Possesion
  .grant(Rol.USER)
  .updateOwn([Resource.USER])
  .deleteOwn([Resource.USER])
  // Admin Possesion
  .grant(Rol.ADMIN)
  .extend(Rol.USER)
  .createAny([Resource.USER])
  .updateAny([Resource.USER])
  .deleteAny([Resource.USER]);
