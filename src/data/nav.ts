//- src/data/nav.ts

import { nav } from "../types/nav"
import {
  DashboardSquare02Icon,
  Package03Icon,
  UserMultiple03Icon,
  ChefHatIcon,
  Chat01Icon,
  NoteEditIcon,
  QuotesIcon,
  ChartAnalysisIcon,
  LaptopCheckIcon,
  Globe02Icon,
  HelpCircleIcon,
  Settings01Icon,
  DiscountTag02Icon,
  ShoppingCart02Icon,
  Invoice03Icon,
  ExchangeDollarIcon,
  ContainerTruck01Icon,
} from "@hugeicons/core-free-icons"

export const dataNav: nav = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: DashboardSquare02Icon,
    },
    {
      title: "Sales",
      url: "#",
      icon: DiscountTag02Icon,
      soon: true,
      submenus: [
        {
          title: "Order",
          url: "/sales/orders",
          icon: ShoppingCart02Icon,
          soon: true,
        },
        {
          title: "Invoice",
          url: "/sales/invoices",
          icon: Invoice03Icon,
          soon: true,
        },
        {
          title: "Shipment",
          url: "/sales/shipments",
          icon: ContainerTruck01Icon,
          soon: true,
        },
        {
          title: "Credit Memo",
          url: "/sales/credit-memos",
          icon: ExchangeDollarIcon,
          soon: true,
        },
      ],
    },
    {
      title: "Manages",
      url: "#",
      icon: LaptopCheckIcon,
      submenus: [
        {
          title: "Product",
          url: "/manages/products",
          icon: Package03Icon,
        },
        {
          title: "Recipe",
          url: "/manages/recipes",
          icon: ChefHatIcon,
        },
        {
          title: "User",
          url: "/manages/users",
          icon: UserMultiple03Icon,
        },
      ],
    },
    {
      title: "Socials",
      url: "#",
      icon: Globe02Icon,
      submenus: [
        {
          title: "Post",
          url: "/socials/posts",
          icon: NoteEditIcon,
        },
        {
          title: "Comment",
          url: "/socials/comments",
          icon: Chat01Icon,
        },
        {
          title: "Quote",
          url: "/socials/quotes",
          icon: QuotesIcon,
        },
      ],
    },
    {
      title: "Reports",
      url: "/reports",
      icon: ChartAnalysisIcon,
      soon: true,
    },
  ],
  navSecondary: [
    {
      title: "Helps",
      url: "/helps",
      icon: HelpCircleIcon,
      soon: true,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings01Icon,
      soon: true,
    },
  ],
}
