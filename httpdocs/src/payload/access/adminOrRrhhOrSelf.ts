import type { Access } from "payload"
import { checkRole } from "./utils/checkRoles"

export const adminOrRrhhOrSelf: Access = ({ req, id }) => {
  const { user } = req
  if (checkRole(["admin"], user)) {
    return true
  }
  if (checkRole(["rrhh"], user)) {
    return true
  }
  return (
    checkRole(["admin"], user) || {
      id: {
        equals: user?.id,
      },
    }
  )
}
