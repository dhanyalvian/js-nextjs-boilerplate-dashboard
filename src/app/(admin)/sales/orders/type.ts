//- src/app/(admin)/manages/products/type.ts

export interface ManageProductListResp {
  id: number,
  name: string,
  sku: string,
  brand: string,
  category: string,
  tags: string[],
  thumbnail: string,
  price: number,
  discount: number,
  stock: number,
}
