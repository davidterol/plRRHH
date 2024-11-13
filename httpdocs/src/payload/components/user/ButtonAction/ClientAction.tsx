"use client"
import { toast } from "@payloadcms/ui"
import { useParams } from "next/navigation"
export default function ClientAction(props: any) {
  console.log("ClientAction", props)
  const { segments } = useParams()
  const sendNotification = () => {
    const userId = segments?.[2]
    console.log("Notification sent!")
    toast.success(`Notification sent! User ${userId}`)
  }

  return (
    <button
      className="cursor-pointer bg-black text-white border-solid border-yellow-200 border-2 p-2 rounded-md no-underline"
      type="button"
      onClick={sendNotification}
    >
      Custom Button
    </button>
  )
}
