import { Permissions } from "./permissions";
import { Role } from "./role";

const roleToPermissions = {
  [Role.USER]: [
    Permissions.GET_WEDDING,
    Permissions.CREATE_WEDDING,
    Permissions.UPDATE_WEDDING
  ]

};

export const findPermissions = (roles: Role[]): Permissions[] => {
  let permissions: Permissions[] = [];

  for (const role of roles) {
    permissions = permissions.concat(roleToPermissions[role]);
  }

  return permissions;
};
