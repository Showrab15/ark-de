/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],

    remotePatterns: [

      { protocol: "https", hostname: "i.ibb.co.com" },
      { protocol: "https", hostname: "weararkade.com" },

    ],
  },
};

export default nextConfig;
