import type { Access } from "payload"
import { checkRole } from "./utils/checkRoles"

export const rrhh: Access = ({ req }) => {
  const { user } = req
  if (checkRole(["admin"], user)) {
    return true
  }

  if (checkRole(["rrhh"], user)) {
    return true
  }

 return false
}
