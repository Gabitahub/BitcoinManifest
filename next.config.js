
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'pbs.twimg.com',
            port: '',
            pathname: '/profile_images/**',
          },
        ],
      },
}

module.exports = withNextIntl(nextConfig)
