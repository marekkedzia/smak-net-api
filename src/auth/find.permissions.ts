import { Permissions } from "./permissions";
import { Role } from "./role";

const roleToPermissions = {
  [Role.USER]: Object.values(Permissions)
};

export const findPermissions = (roles: Role[]): Permissions[] => {
  let permissions: Permissions[] = [];

  for (const role of roles) {
    permissions = permissions.concat(roleToPermissions[role]);
  }

  return permissions;
};
