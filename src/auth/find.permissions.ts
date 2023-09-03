import { RoutePermission } from "./permission";
import { Role } from "./role";

const roleToPermissions = {
  [Role.USER]: [
    RoutePermission.GET_WEDDING,
    RoutePermission.CREATE_WEDDING,
    RoutePermission.UPDATE_WEDDING
  ]

};

export const findPermissions = (roles: Role[]): RoutePermission[] => {
  let permissions: RoutePermission[] = [];

  for (const role of roles) {
    permissions = permissions.concat(roleToPermissions[role]);
  }

  return permissions;
};
