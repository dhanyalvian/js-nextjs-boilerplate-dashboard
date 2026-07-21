//- src/app/(admin)/manages/users/page.tsx

"use client"

import { ApiInternal, useCurl } from "@/lib/api"
import { ApiResp } from "@/types/response"
import { ManageUserListResp } from "./type"
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

const getManageUserList = async (
  page: number,
  limit: number,
  search: string,
): Promise<ApiResp<ManageUserListResp>> => {
  const data = await ApiInternal(`/users?search=${search}&page=${page}&limit=${limit}`)
  ScrollToTop()
  return data
}

const ManageUserPage = () => {
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
        queryKey: ["manages", "users", "list", page, limit, debouncedSearch],
        queryFn: () => getManageUserList(page, limit, debouncedSearch),
        refetchOnWindowFocus: false,
      },
    ],
  })
  const [queryManageUser] = queries
  const isLoading = queryManageUser.isLoading || queryManageUser.isFetching

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <DataTable
          addHref="/manages/users"
          title="User"
          columns={Columns}
          data={queryManageUser.data?.records || []}
          isLoading={isLoading}
          limit={limit}
          totalRows={queryManageUser.data?.pagination.totalRecord ?? 0}
          page={page}
          setPage={setPage}
          search={search}
          setSearch={setSearch}
        />
      </AppMain>
    </>
  )
}

export default ManageUserPage
