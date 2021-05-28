const packageName = require('./package.json').name;
const path = require('path');
const resolvePath = dir => path.resolve(__dirname, dir);
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/child/micro1/' : '/',
  productionSourceMap: false,
  devServer: {
    // host: '0.0.0.0',
    port: 9001,
    // 关闭主机检查，使微应用可以被 fetch
    disableHostCheck: true,
    // 配置跨域请求头，解决开发环境的跨域问题
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
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
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              pure_funcs: ['console.log'], //忽略console.log语句
            },
          },
        }),
      ],
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: true,
        statsFilename: '../analyzer/stats.json', // 相对于捆绑输出目录
        statsOptions: { source: false },
      }),
    ],
    // 微应用的打包工具配置
    output: {
      // 微应用的包名，这里与主应用中注册的微应用名称一致
      // library: 'Vue2MicroApp',
      library: `${packageName}-[name]`,
      // 将你的 library 暴露为所有的模块定义下都可运行的方式
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      // 按需加载相关，设置为 webpackJsonp_Vue2MicroApp 即可
      // jsonpFunction: 'webpackJsonp_Vue2MicroApp',
      jsonpFunction: `webpackJsonp_${packageName}`,
    },
  },
};
