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
      or: [
        {
          department: {
            equals: user?.employee.valueOf().department,
          },
        },
        {
          user: {
            equals: user?.id,
          },
        },
      ],
    }
  }
  if (user?.employee?.valueOf().position == "Director/a General") {
    if (req.url?.includes("/admin/collections/requests/")) {
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
          {
            type: {
              equals: "asuntos_propios",
            },
          },
        ],
      }
    }
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
  } else {
    return {
      user: {
        equals: user?.id,
      },
    }
  }
}
