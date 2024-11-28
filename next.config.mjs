/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    // Ignore all .map files
    config.module.rules.push({
      test: /\.map$/,
      use: 'ignore-loader',
      include: /node_modules/,
    });

    // Ignore .d.ts files
    config.module.rules.push({
      test: /\.d\.ts$/,
      use: 'ignore-loader',
      include: /node_modules/,
    });

    // Add fallbacks for node modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      path: false,
      os: false,
    };

    // Ignore specific problematic files
    config.module.rules.push({
      test: /node_modules\/@metamask\/sdk\/.*\.(map|d\.ts\.map)$/,
      use: 'ignore-loader',
    });

    return config;
  },
  transpilePackages: ['@metamask/sdk'],
}

export default nextConfig;
