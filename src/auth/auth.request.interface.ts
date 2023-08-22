import { Request } from "express";
import { PatientPermission } from "./patient.permission";
import { Role } from "./role";

export interface AuthRequest extends Request {
  user: AuthUser;
  role: Role;
  authorisations: { [key: string]: boolean };
}

export interface FileRequest extends AuthRequest {
  uploadedFiles: string[];
  failedUploads: { [filename: string]: string };
}

export interface SearchRequest extends AuthRequest {
  pagination: Pagination;
}

interface AuthUser {
  id: string;
  name: string;
  roles: Role[];
  permissions: PatientPermission[];
}

export interface Pagination {
  page: number;
  size: number;
}
