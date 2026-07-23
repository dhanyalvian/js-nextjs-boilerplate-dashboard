//- src/app/(admin)/manages/recipes/page.tsx

"use client"

import { ApiInternal, useCurl } from "@/lib/api"
import { ApiResp } from "@/types/response"
import { ManageRecipeListResp } from "./type"
import { ScrollToTop } from "@/lib/scroll"
import { useEffect } from "react"
import { useQueries } from "@tanstack/react-query"
import { AppHeader, AppMain } from "@/components/core/app-layout"
import { DataTable } from "@/components/core/data-table/table"
import { Columns } from "./column"
import { Filters } from "./filters"

const breadcrumbItems = [
  { label: "Manages" },
  { label: "Recipe" },
]

const getManageRecipeList = async (
  page: number,
  limit: number,
  search: string,
): Promise<ApiResp<ManageRecipeListResp>> => {
  const data = await ApiInternal(`/recipes?search=${search}&page=${page}&limit=${limit}`)
  ScrollToTop()
  return data
}

const ManageRecipePage = () => {
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
        queryFn: () => getManageRecipeList(page, limit, debouncedSearch),
        refetchOnWindowFocus: false,
      },
    ],
  })
  const [queryManageRecipe] = queries
  const isLoading = queryManageRecipe.isLoading || queryManageRecipe.isFetching

  return (
    <>
      <AppHeader breadcrumbItems={breadcrumbItems} />

      <AppMain>
        <DataTable
          addHref="/manages/recipes"
          title="Recipe"
          columns={Columns}
          data={queryManageRecipe.data?.records || []}
          isLoading={isLoading}
          limit={limit}
          totalRows={queryManageRecipe.data?.pagination.totalRecord ?? 0}
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

export default ManageRecipePage
