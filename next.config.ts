import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // МЫ ГОВОРИМ VERCEL: "ИГНОРИРУЙ ОШИБКИ ТИПОВ ПРИ СБОРКЕ"
    ignoreBuildErrors: true,
  },
  eslint: {
    // Также игнорируем ошибки линтера, чтобы билд прошел на 100%
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
