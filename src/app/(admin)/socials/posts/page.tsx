//- src/app/(admin)/projects/page.tsx

"use client"

import { ApiInternal, useCurl } from "@/lib/api"
import { ApiResp } from "@/types/response"
import { SocialPostListResp } from "./type"
import { ScrollToTop } from "@/lib/scroll"
import { useEffect } from "react"
import { useQueries } from "@tanstack/react-query"
import { AppHeader, AppMain } from "@/components/core/app-layout"
import { DataTable } from "@/components/core/data-table/table"
import { Columns } from "./column"

const breadcrumbItems = [
  { label: "Socials" },
  { label: "Post" },
]

const getSocialPostList = async (
  page: number,
  limit: number,
  search: string,
): Promise<ApiResp<SocialPostListResp>> => {
  const data = await ApiInternal(`/posts?search=${search}&page=${page}&limit=${limit}`)
  ScrollToTop()
  return data
}

const SocialPostPage = () => {
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
        queryKey: ["socials", "posts", "list", page, limit, debouncedSearch],
        queryFn: () => getSocialPostList(page, limit, debouncedSearch),
        refetchOnWindowFocus: false,
      },
    ],
  })
  const [querySocialPost] = queries
  const isLoading = querySocialPost.isLoading || querySocialPost.isFetching

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <DataTable
          addHref="/socials/posts"
          title="Post"
          columns={Columns}
          data={querySocialPost.data?.records || []}
          isLoading={isLoading}
          limit={limit}
          totalRows={querySocialPost.data?.pagination.totalRecord ?? 0}
          page={page}
          setPage={setPage}
          search={search}
          setSearch={setSearch}
        />
      </AppMain>
    </>
  )
}

export default SocialPostPage
