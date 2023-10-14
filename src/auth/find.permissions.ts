import { Permission } from "./permission";
import { Role } from "./role";

const roleToPermissions = {
  [Role.USER]: [
  ]

};

export const findPermissions = (roles: Role[]): Permission[] => {
  let permissions: Permission[] = [];

  for (const role of roles) {
    permissions = permissions.concat(roleToPermissions[role]);
  }

  return permissions;
};
