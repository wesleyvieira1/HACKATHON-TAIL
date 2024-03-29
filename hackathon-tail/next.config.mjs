/** @type {import('next').NextConfig} */
//import webpack from 'webpack';
//const webpack = require('webpack')

const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.FLUENTFFMPEG_COV': false
      }),
      new webpack.IgnorePlugin({
        resourceRegExp : /^fsevents$/
      })
      )
   
      return config
    },
    async rewrites() {
      return [
        {
          source: '/:path*',
          destination:'/',
        },
      ]
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*',
          port: '',
          pathname: '/**',
        },
      ],
    },
    
  }

export default nextConfig;