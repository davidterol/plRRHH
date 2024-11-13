import type { Access } from "payload"
import { checkRole } from "./utils/checkRoles"

export const authenticated: Access = ({ req: { user } }) =>
  checkRole(["authenticated"], user)
