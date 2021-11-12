import { ACGuard, Role, UseRoles } from 'nest-access-control';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '~m/auth/guards';

export const Auth = (...roles: Role[]) =>
  applyDecorators(
    UseGuards(JwtAuthGuard, ACGuard),
    UseRoles(...roles),
    ApiBearerAuth(),
  );
