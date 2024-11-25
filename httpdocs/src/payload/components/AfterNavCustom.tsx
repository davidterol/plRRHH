'use client'
import { NavGroup, useNav } from '@payloadcms/ui'
import Link from 'next/link'
import { cn } from '@/utils/cn'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const customRoutes: {
  label: string
  path: string
}[] = [
  { label: 'Custom Page', path: '/admin/custom-page' },
  { label: 'Other Page', path: '/admin/other-page' },
]


export const AfterNavCustom = () => {
  const pathname = usePathname()
  const { navRef } = useNav()
  return (
    useEffect(() => {
      navRef.current?.classList.add('prueba')
      console.log(navRef.current?.children[0]?.children[2])
    }, [])
  )
}
