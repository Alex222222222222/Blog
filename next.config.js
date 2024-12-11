/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  eslint: {
    dirs: ['app', 'components', "lib", "interfaces"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  webpack: (config, { nextRuntime }) => {
    if (typeof nextRuntime === "undefined") {
      config.resolve.fallback = {
        ...config.resolve.fallback,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
