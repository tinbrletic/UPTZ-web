import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  images: {
    // Enable image optimization for better performance
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000, // 1 year cache for images
  },

  // Compress responses
  compress: true,

  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["react", "react-dom"],
  },

  // Configure webpack for better SVG handling
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  }, // Headers for better caching and SEO
  async headers() {
    const shouldIndex =
      process.env.NODE_ENV === "production" ||
      process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

    return [
      {
        source: "/:path*.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Control indexing based on environment
      {
        source: "/:path*",
        headers: shouldIndex
          ? [
              {
                key: "X-Robots-Tag",
                value:
                  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
              },
            ]
          : [
              {
                key: "X-Robots-Tag",
                value: "noindex, nofollow",
              },
            ],
      },
    ];
  },
};

export default nextConfig;
