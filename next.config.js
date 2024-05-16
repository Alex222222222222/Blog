/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  exclude: ["/functions"],
};

module.exports = nextConfig;
