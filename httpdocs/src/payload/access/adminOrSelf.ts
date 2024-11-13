import type { Access } from "payload"
import { checkRole } from "./utils/checkRoles"

export const adminOrSelf: Access = ({ req }) => {
  const { user } = req
  if (checkRole(["admin"], user)) {
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
