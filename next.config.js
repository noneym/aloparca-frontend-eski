require('dotenv').config();
const fs = require('fs');
const path = require('path');
const withPlugins = require('next-compose-plugins');
const css = require('@zeit/next-css');
const offline = require('next-offline');
const images = require('next-images');
const Dotenv = require('dotenv-webpack');

let plugins = [css, images];

if (process.env.NODE_ENV === 'production') {
  plugins = plugins.concat(offline);
}

//const devDomainURL = `http://localhost:${process.env.PORT || 3000}`;
const devDomainURL = process.env.DOMAIN_URL;

const isDev = process.env.NODE_ENV !== 'production';

module.exports = withPlugins(plugins, {
  publicRuntimeConfig: {
    DOMAIN_URL: isDev ? devDomainURL : process.env.DOMAIN_URL,
    API_URL: process.env.API_URL,
    SITE: process.env.SITE,
  },
  webpack(config) {
    // PLUGINS
    config.plugins = config.plugins || [];
    //config.devServer={historyApiFallBack:true};
    const envPath = path.join(__dirname, '.env');
    fs.access(envPath, fs.F_OK, (err) => {
      if (!err) {
        config.plugins = [
          ...config.plugins,
          // Read the .env file
          new Dotenv({
            path: envPath,
            systemvars: true,
          }),
        ];
      }
    });

    // IMPORT FONT FILES
    config.module.rules.push({
      test: /\.(eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          publicPath: './',
          outputPath: 'static/',
          name: '[name].[ext]',
        },
      },
    });

    return config;
  },
});
