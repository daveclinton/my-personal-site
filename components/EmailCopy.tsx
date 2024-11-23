"use client";
import { Copy } from "lucide-react";
import { useState } from "react";

export function EmailCopy() {
  const [isCopied, setIsCopied] = useState(false);
  const email = "contact@daveclintonn.cc";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <p
      onClick={copyEmail}
      className="mb-4 animate-pulse flex items-center gap-x-2 cursor-pointer"
    >
      Looking to hire me? Email me : {email}
      {isCopied ? (
        <span className="text-green-500">✓</span>
      ) : (
        <Copy size={15} color="" />
      )}
    </p>
  );
}
