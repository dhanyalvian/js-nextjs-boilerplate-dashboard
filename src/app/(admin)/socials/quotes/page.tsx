//- src/app/(admin)/socials/quotes/page.tsx

"use client"

import { ApiInternal, useCurl } from "@/lib/api"
import { ApiResp } from "@/types/response"
import { SocialQuoteListResp } from "./type"
import { ScrollToTop } from "@/lib/scroll"
import { useEffect } from "react"
import { useQueries } from "@tanstack/react-query"
import { AppHeader, AppMain } from "@/components/core/app-layout"
import { DataTable } from "@/components/core/data-table/table"
import { Columns } from "./column"

const breadcrumbItems = [
  { label: "Socials" },
  { label: "Quote" },
]

const getSocialQuoteList = async (
  page: number,
  limit: number,
  search: string,
): Promise<ApiResp<SocialQuoteListResp>> => {
  const data = await ApiInternal(`/quotes?search=${search}&page=${page}&limit=${limit}`)
  ScrollToTop()
  return data
}

const SocialQuotePage = () => {
  const {
    search,
    setSearch,
    debouncedSearch,
    setDebouncedSearch,
    page,
    setPage,
  } = useCurl()
  const limit = 15

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 1000)
    return () => clearTimeout(handler)
  }, [search, setDebouncedSearch, setPage])

  const queries = useQueries({
    queries: [
      {
        queryKey: ["socials", "quotes", "list", page, limit, debouncedSearch],
        queryFn: () => getSocialQuoteList(page, limit, debouncedSearch),
        refetchOnWindowFocus: false,
      },
    ],
  })
  const [querySocialQuote] = queries
  const isLoading = querySocialQuote.isLoading || querySocialQuote.isFetching

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <DataTable
          addHref="/socials/quotes"
          title="Quote"
          columns={Columns}
          data={querySocialQuote.data?.records || []}
          isLoading={isLoading}
          limit={limit}
          totalRows={querySocialQuote.data?.pagination.totalRecord ?? 0}
          page={page}
          setPage={setPage}
          search={search}
          setSearch={setSearch}
        />
      </AppMain>
    </>
  )
}

export default SocialQuotePage
