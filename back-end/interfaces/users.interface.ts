import { Roles } from "@prisma/client";

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  role?: Roles
}