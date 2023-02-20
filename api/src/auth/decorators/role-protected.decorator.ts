import { SetMetadata } from '@nestjs/common';

import { ValidRoles } from '../dto/valid-roles.interface';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: ValidRoles[]) => {
  console.log(args)
  return SetMetadata(META_ROLES, args);
};
