//- src/types/nav.ts

import { type IconSvgElement } from "@hugeicons/react"

export interface nav {
  navMain: navObj[],
  navSecondary: navObj[],
  navUser: navObj[],
}

export interface navObj {
  id?: string,
  title: string,
  url: string,
  desc?: string,
  icon: IconSvgElement,
  soon?: boolean,
  submenus?: navObj[],
}
