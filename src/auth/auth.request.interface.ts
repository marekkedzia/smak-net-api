import { Permissions } from "./permissions";
import { Role } from "./role";


interface AuthUser {
  id: string;
  name: string;
  roles: Role[];
  permissions: Permissions[];
}

export interface Pagination {
  page: number;
  size: number;
}
