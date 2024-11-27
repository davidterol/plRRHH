import type { Access } from "payload"
import { checkRole } from "./utils/checkRoles"

export const managers: Access = ({ req }) => {
  const { user } = req
  if (checkRole(["admin"], user)) {
    return true
  }
  if (checkRole(["rrhh"], user)) {
    return true
  }
  if (user?.employee?.valueOf().position == "Director/a de Área") {
    return {
      department: {
        equals: user?.employee.valueOf().department,
      },
    }
  }
  if (user?.employee?.valueOf().position == "Director/a General") {
    return {
      or: [
        {
          user: {
            equals: user?.id,
          },
        },
        {
          user: {
            in: "67320b018128eef2bc73f80f",
          },
        },
      ],
    }
  }
  if (
    user?.employee?.valueOf().position != "Director/a de Área" ||
    user?.employee?.valueOf().position != "Director/a General"
  ) {
    return {
      user: {
        equals: user?.id,
      },
    }
  }
  return false
}
