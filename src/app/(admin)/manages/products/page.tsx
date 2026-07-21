//- src/app/(admin)/manages/products/page.tsx

"use client"

import { ApiInternal, useCurl } from "@/lib/api"
import { ApiResp } from "@/types/response"
import { ManageProductListResp } from "./type"
import { ScrollToTop } from "@/lib/scroll"
import { useEffect } from "react"
import { useQueries } from "@tanstack/react-query"
import { AppHeader, AppMain } from "@/components/core/app-layout"
import { DataTable } from "@/components/core/data-table/table"
import { Columns } from "./column"

const breadcrumbItems = [
  { label: "Manages" },
  { label: "Product" },
]

const getManageProductList = async (
  page: number,
  limit: number,
  search: string,
): Promise<ApiResp<ManageProductListResp>> => {
  const data = await ApiInternal(`/products?search=${search}&page=${page}&limit=${limit}`)
  ScrollToTop()
  return data
}

const ManageProductPage = () => {
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
        queryKey: ["manages", "recipes", "list", page, limit, debouncedSearch],
        queryFn: () => getManageProductList(page, limit, debouncedSearch),
        refetchOnWindowFocus: false,
      },
    ],
  })
  const [queryManageProduct] = queries
  const isLoading = queryManageProduct.isLoading || queryManageProduct.isFetching

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <DataTable
          addHref="/manages/products"
          title="Product"
          columns={Columns}
          data={queryManageProduct.data?.records || []}
          isLoading={isLoading}
          limit={limit}
          totalRows={queryManageProduct.data?.pagination.totalRecord ?? 0}
          page={page}
          setPage={setPage}
          search={search}
          setSearch={setSearch}
        />
      </AppMain>
    </>
  )
}

export default ManageProductPage
