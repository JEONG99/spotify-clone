/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["k.kakaocdn.net", "atsunqgwavbioctbwbpo.supabase.co"],
  },
  headers: async () => [
    {
      source: "/:all*(svg|jpg|png|woff2|webp)",
      locale: false,
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=99999",
        },
      ],
    },
  ],
};

module.exports = nextConfig;
