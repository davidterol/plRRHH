"use client"
import { useAuth } from "@payloadcms/ui"

export default function Avatar() {
  const { user } = useAuth()
  const email = user?.email

  return (
    <div className="flex mr-12 gap-2 items-center">
      <img
        className="rounded-full w-10"
        src={`https://ui-avatars.com/api/?name=${email}`}
      />
      <span>{email}</span>
    </div>
  )
}
