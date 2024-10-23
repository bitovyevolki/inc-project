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
  // webpack: (config, { isServer }) => {
  //   const isProd = process.env.NODE_ENV === 'production'
  //   const remoteUrl = isProd
  //     ? `https://your-remote-site.com/remoteEntry.js`
  //     : `http://localhost:3001/remoteEntry.js`

  //   config.plugins.push(
  //     new ModuleFederationPlugin({
  //       exposes: {},
  //       filename: 'static/chunks/remoteEntry.js',
  //       name,
  //       remotes: {
  //         Messenger: `messenger@${remoteUrl}`,
  //       },
  //       shared: {
  //         react: { eager: true, requiredVersion: deps.react, singleton: true },
  //         'react-dom': { eager: true, requiredVersion: deps['react-dom'], singleton: true },
  //       },
  //     })
  //   )

  //   return config
  // },
}

module.exports = withNextIntl(nextConfig)
