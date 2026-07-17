import type { NextConfig } from "next"

const cdnArr = (process.env.NEXT_PUBLIC_CONFIG_IMAGE_REMOTE ?? "").split("|")
const cdnArrUrl = cdnArr.map((url) => (new URL(url)))

const nextConfig: NextConfig = {
  images: {
    remotePatterns: cdnArrUrl,
  },
}

export default nextConfig
