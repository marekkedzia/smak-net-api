import { Permission } from "./permission";
import { Role } from "./role";


interface AuthUser {
  id: string;
  name: string;
  roles: Role[];
  permissions: Permission[];
}

export interface Pagination {
  page: number;
  size: number;
}
