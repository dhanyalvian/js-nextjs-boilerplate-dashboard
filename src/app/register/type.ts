//- src/app/register/type.ts

export interface RegisterResp {
  id: number,
  email: string,
  name: string,
  avatar: string,
}

export interface RegisterData {
  name: string,
  email: string,
  password: string,
}
