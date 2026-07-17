//- src/app/login/type.ts

export interface LoginResp {
  user: {
    id: number,
    email: string,
    name: string,
  },
  accessToken: string,
  refreshToken: string,
}

export interface LoginData {
  email: string,
  password: string,
}
