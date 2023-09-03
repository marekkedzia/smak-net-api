import { RoutePermission } from "./permission";
import { Role } from "./role";


interface AuthUser {
  id: string;
  name: string;
  roles: Role[];
  permissions: RoutePermission[];
}

export interface Pagination {
  page: number;
  size: number;
}
