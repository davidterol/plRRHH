"use client"
import { NavGroup } from "@payloadcms/ui"
import Link from "next/link"
import { cn } from "@/utils/cn"
import { usePathname } from "next/navigation"

const customRoutes: {
  label: string,
  path: string,
}[] = [
  { label: "Custom Page", path: "/admin/custom-page" },
  { label: "Other Page", path: "/admin/other-page" },
]

export const AfterNavCustom = () => {
  const pathname = usePathname()
  return (
    <NavGroup label="Custom Routes">
      {customRoutes.map((route) => (
        <Link
          className={cn("nav__link", route.path === pathname && "active")}
          key={route.path}
          href={route.path}
        >
          {route.path === pathname && <div className="nav__link-indicator" />}
          <span className="nav__link-label">{route.label}</span>
        </Link>
      ))}
    </NavGroup>
  )
}
