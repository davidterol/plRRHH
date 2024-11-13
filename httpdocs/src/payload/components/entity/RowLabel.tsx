"use client"
import type { RowLabelComponent } from "payload"
import { useRowLabel } from "@payloadcms/ui"

const RowLabel: React.FC<RowLabelComponent> = () => {
  const { data } = useRowLabel<{ name: string }>()
  return <div className="uppercase font-bold">{data.name || "No definido"}</div>
}

export default RowLabel
