//- src/app/(admin)/manages/recipes/type.ts

export interface ManageRecipeListResp {
  id: number,
  name: string,
  image: string,
  cuisine: string,
  cuisineCode: string,
  difficulty: string,
  mealType: string[],
  tags: string[],
}
