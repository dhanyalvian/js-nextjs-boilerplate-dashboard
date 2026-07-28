//- src/app/(admin)/sales/orders/card.tsx

import { CardStat } from "@/components/sections/dashboard/type";
import {
  CancelCircleHalfDotIcon,
  DeliveryTruck01Icon,
  ShoppingCart02Icon,
  TimeQuarter02Icon,
  TransactionIcon
} from "@hugeicons/core-free-icons";

export const CardStats: CardStat[] = [
  {
    label: "Total Orders",
    value: 1247,
    icon: ShoppingCart02Icon,
  },
  {
    label: "Waiting for Payment",
    value: 7,
    icon: TransactionIcon,
  },
  {
    label: "Pending Orders",
    value: 156,
    icon: TimeQuarter02Icon,
  },
  {
    label: "Delivered",
    value: 1091,
    icon: DeliveryTruck01Icon,
  },
  {
    label: "Cancelled",
    value: 34,
    icon: CancelCircleHalfDotIcon,
  },
]
