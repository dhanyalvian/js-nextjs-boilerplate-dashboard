//- src/lib/api.ts

import { useState } from "react"

export const useCurl = () => {
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  const [page, setPage] = useState(1)
  const limit = 20
  
  return {
    search,
    setSearch,
    debouncedSearch,
    setDebouncedSearch,
    page,
    setPage,
    limit,
  }
}

export const ApiInternal = async (path: string, options?: RequestInit) => {
  const ep = process.env.NEXT_PUBLIC_CONFIG_API_INT_EP || "/api/v1"
  const url = `${ep}${path}`
  console.log("url:", url)
  const res = await fetch(url, { ...options })
  const data = await res.json()
  return data
}
