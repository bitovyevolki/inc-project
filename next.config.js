const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['staging-it-incubator.s3.eu-central-1.amazonaws.com'],
  },
}

module.exports = withNextIntl(nextConfig)
