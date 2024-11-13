import type { User } from "@/payload/payload-types"
interface UserWithCollection extends User {
  collection: "users";
}
export const checkRole = (
  allRoles: User["roles"] = [],
  user: UserWithCollection | null,
): boolean => {
  if (user) {
    if (
      allRoles.some((role) => {
        return user?.roles?.some((individualRole) => {
          return individualRole === role
        })
      })
    )
      return true
  }

  return false
}
