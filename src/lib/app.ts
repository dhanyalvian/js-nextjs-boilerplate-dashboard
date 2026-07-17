//- src lib/app.ts

export const getAppConfig = () => {
  return {
    appName: process.env.NEXT_PUBLIC_APP_NAME || "Boilerplate Dashboard",
    appDesc: process.env.NEXT_PUBLIC_APP_DESC || "Boilerplate Dashboard is a developer-first starter template for building internal tools, admin panels, and SaaS dashboards. Batteries included: auth, layout, theming, and a component library — all wired up and ready to customize.",
    appGithub: process.env.NEXT_PUBLIC_APP_GITHUB || "https://github.com/dhanyalvian",

    configApiIntEp: process.env.NEXT_PUBLIC_CONFIG_API_INT_EP || "/api/v1",
    configImageRemote: process.env.NEXT_PUBLIC_CONFIG_IMAGE_REMOTE || "https://cdn.dummyjson.com/**|https://dummyjson.com/icon/**|https://lh3.googleusercontent.com/a/**",
    configApiLimit: process.env.NEXT_PUBLIC_CONFIG_API_LIMIT || 20,
    configApiDelay: process.env.NEXT_PUBLIC_CONFIG_API_DELAY || 3000,
    configNotifTimeout: process.env.NEXT_PUBLIC_CONFIG_NOTIF_TIMEOUT || 5000,
  }
}

const AppConfig = getAppConfig()

export {
  AppConfig
}
