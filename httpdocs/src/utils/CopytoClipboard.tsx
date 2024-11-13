"use client"
import { useState } from "react"

// getMefeedBack

function CopytoClipboard({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false)

  function copyText() {
    navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 3000)
  }

  return (
    <div className="relative">
      {isCopied && (
        <div className="absolute tracking-wide -top-6 left-1 bg-primary-400/90 text-xs text-primary-50 px-2 py-1 rounded-lg">
          Copied!
        </div>
      )}
      <button
        className="ring-0 underline bg-transparent text-sm font-normal tracking-wide text-blue-500 p-0 border-transparent ring-offset-transparent focus:outline-none focus:ring-0 focus:ring-offset-transparent focus:border-transparent "
        onClick={copyText}
      >
        {text}
      </button>
    </div>
  )
}

export default CopytoClipboard
