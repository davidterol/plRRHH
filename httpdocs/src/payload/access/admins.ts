import type { Access } from "payload"
import { checkRole } from "./utils/checkRoles"

export const admins: Access = ({ req }) => {
  const { user } = req
  return checkRole(["admin"], user)
}
