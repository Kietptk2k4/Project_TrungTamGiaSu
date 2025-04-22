// components/ui/avatar.jsx
import React from "react"

export const Avatar = ({ children, className = "" }) => {
  return (
    <div className={`relative inline-block rounded-full overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

export const AvatarImage = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
    />
  )
}

export const AvatarFallback = ({ children }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-300 text-white font-bold text-sm">
      {children}
    </div>
  )
}
