//- src/app/(admin)/transactions/type.ts

export interface SocialPostListResp {
  id: number,
  title: string,
  body: string,
  tags: string[],
  likes: number,
  dislikes: number,
  views: number,
}
