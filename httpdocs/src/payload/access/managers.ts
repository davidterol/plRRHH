import type { Access } from "payload"
import { checkRole } from "./utils/checkRoles"

export const managers: Access = ({ req }) => {
  const { user } = req
  const isManager = (element) => element == "admin";
  console.log(isManager)
  return true
}
