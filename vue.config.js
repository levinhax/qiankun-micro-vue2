const path = require('path');
const resolvePath = dir => path.resolve(__dirname, dir);

module.exports = {
  productionSourceMap: false,
  devServer: {
    // host: '0.0.0.0',
    port: 9001,
    proxy: {
      '/asset': {
        changeOrigin: true,
        target: 'http://192.168.31.200:8080',
      },
      '/mask-api': {
        target: 'http://192.168.31.200:7089/',
        pathRewrite: {
          '^/mask-api': '/AiMask/webApp',
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolvePath('src'),
      },
    },
  },
};
