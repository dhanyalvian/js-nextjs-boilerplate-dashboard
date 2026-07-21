//- src/app/(admin)/socials/comments/page.tsx

"use client"

import { ApiInternal, useCurl } from "@/lib/api"
import { ApiResp } from "@/types/response"
import { SocialCommentListResp } from "./type"
import { ScrollToTop } from "@/lib/scroll"
import { useEffect } from "react"
import { useQueries } from "@tanstack/react-query"
import { AppHeader, AppMain } from "@/components/core/app-layout"
import { DataTable } from "@/components/core/data-table/table"
import { Columns } from "./column"

const breadcrumbItems = [
  { label: "Socials" },
  { label: "Comment" },
]

const getSocialCommentList = async (
  page: number,
  limit: number,
  search: string,
): Promise<ApiResp<SocialCommentListResp>> => {
  const data = await ApiInternal(`/comments?search=${search}&page=${page}&limit=${limit}`)
  ScrollToTop()
  return data
}

const SocialCommentPage = () => {
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
        queryKey: ["socials", "comments", "list", page, limit, debouncedSearch],
        queryFn: () => getSocialCommentList(page, limit, debouncedSearch),
        refetchOnWindowFocus: false,
      },
    ],
  })
  const [querySocialComment] = queries
  const isLoading = querySocialComment.isLoading || querySocialComment.isFetching

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <DataTable
          addHref="/socials/comments"
          title="Comment"
          columns={Columns}
          data={querySocialComment.data?.records || []}
          isLoading={isLoading}
          limit={limit}
          totalRows={querySocialComment.data?.pagination.totalRecord ?? 0}
          page={page}
          setPage={setPage}
          search={search}
          setSearch={setSearch}
        />
      </AppMain>
    </>
  )
}

export default SocialCommentPage
