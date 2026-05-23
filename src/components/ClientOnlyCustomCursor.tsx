"use client"

import { useEffect, useState } from "react"
import CustomCursor from "./CustomCursor"

export default function ClientOnlyCustomCursor() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return <CustomCursor />
}
