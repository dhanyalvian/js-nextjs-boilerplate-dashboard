//- src/app/(admin)/sales/orders/page.tsx

"use client"

import { ApiResp } from "@/types/response"
import { ManageProductListResp } from "../../manages/products/type"
import { ApiInternal, useCurl } from "@/lib/api"
import { ScrollToTop } from "@/lib/scroll"
import { useEffect } from "react"
import { useQueries } from "@tanstack/react-query"
import { AppHeader, AppMain } from "@/components/core/app-layout"
import { DataTable } from "@/components/core/data-table/table"
import { Columns } from "./column"
import { Filters } from "./filters"
import { CardStats } from "./card"
import { CardSectionStandard } from "@/components/core/card/section"

const breadcrumbItems = [
  { label: "Sales" },
  { label: "Order" },
]

const getSalesOrderList = async (
  page: number,
  limit: number,
  search: string,
): Promise<ApiResp<ManageProductListResp>> => {
  const data = await ApiInternal(`/products?search=${search}&page=${page}&limit=${limit}`)
  ScrollToTop()
  return data
}

const SalesOrderPage = () => {
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
        queryKey: ["sales", "products", "list", page, limit, debouncedSearch],
        queryFn: () => getSalesOrderList(page, limit, debouncedSearch),
        refetchOnWindowFocus: false,
      },
    ],
  })
  const [querySalesOrder] = queries
  const isLoading = querySalesOrder.isLoading || querySalesOrder.isFetching

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <CardSectionStandard cardStats={CardStats} isLoading={false} />

        <DataTable
          addHref="/sales/orders"
          title="Order"
          columns={Columns}
          data={querySalesOrder.data?.records || []}
          isLoading={isLoading}
          limit={limit}
          totalRows={querySalesOrder.data?.pagination.totalRecord ?? 0}
          page={page}
          setPage={setPage}
          search={search}
          setSearch={setSearch}
          filters={Filters({
            isLoading: isLoading,
          })}
        />
      </AppMain>
    </>
  )
}

export default SalesOrderPage
