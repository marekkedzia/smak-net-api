import { PatientPermission } from "./patient.permission";
import { Role } from "./role";

const roleToPermissions = {
  [Role.PATIENT]: Object.values(PatientPermission)
};

export const findPermissions = (roles: Role[]): PatientPermission[] => {
  let permissions: PatientPermission[] = [];

  for (const role of roles) {
    permissions = permissions.concat(roleToPermissions[role]);
  }

  return permissions;
};
