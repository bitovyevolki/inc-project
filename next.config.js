const createNextIntlPlugin = require('next-intl/plugin')
const { container } = require('webpack')
const ModuleFederationPlugin = container.ModuleFederationPlugin
const { dependencies: deps, name } = require('./package.json')

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['staging-it-incubator.s3.eu-central-1.amazonaws.com'],
  },
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new ModuleFederationPlugin({
        exposes: {},
        filename: 'static/chunks/remoteEntry.js',
        name,
        remotes: {
          messenger: `messenger@http://localhost:3001/remoteEntry.js`,
        },
        shared: {
          ...deps,
          react: { eager: true, requiredVersion: deps.react, singleton: true },
          'react-dom': { eager: true, requiredVersion: deps['react-dom'], singleton: true },
        },
      })
    )

    return config
  },
}

module.exports = withNextIntl(nextConfig)
