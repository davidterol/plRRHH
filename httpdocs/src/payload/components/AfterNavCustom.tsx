'use client'
import { NavGroup, useNav } from '@payloadcms/ui'
import Link from 'next/link'
import { cn } from '@/utils/cn'
import { usePathname } from 'next/navigation'

const customRoutes: {
  label: string
  path: string
}[] = [
  { label: 'Calendar', path: '/admin/calendar' },
  { label: 'FAQs', path: '/admin/faqs' },
  // { label: 'Other Page', path: '/admin/other-page' },
]

export const AfterNavCustom = () => {
  const pathname = usePathname()
  return (
    <NavGroup label="Enlaces de interés">
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