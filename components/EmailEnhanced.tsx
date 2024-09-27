'use client'
import React, { useState } from 'react'
import { Copy } from 'lucide-react'

const EnhancedEmailSection = () => {
  const [isCopied, setIsCopied] = useState(false)
  const email = 'clintondavid46@gmail.com'

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <p className="flex items-center space-x-2 text-gray-300">
      <span>
        Looking to hire me? Email me @ {email}{' '}
        <button
          onClick={copyEmail}
          className="rounded p-1 text-primary-500 transition-colors duration-200 hover:text-primary-400 focus:outline-none "
          aria-label="Copy email address"
        >
          {isCopied ? <span className="text-green-500">✓</span> : <Copy size={12} />}
        </button>
      </span>

      {isCopied && <span className="animate-fade-in-out text-sm text-green-500">Copied!</span>}
    </p>
  )
}

export default EnhancedEmailSection
