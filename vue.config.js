const packageName = require('./package.json').name;
const path = require('path');
const resolvePath = dir => path.resolve(__dirname, dir);
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|html)(\?.*)?$/i;
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';
// 是否需要使用cdn
// const isNeedCdn = false;

// cdn链接
// const cdn = {
//   // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
//   externals: {
//     axios: 'axios',
//     'ant-design-vue': 'Antd',
//   },
//   // cdn的css链接
//   css: ['https://unpkg.com/browse/ant-design-vue@1.7.5/dist/antd.min.css'],
//   // cdn的js链接
//   js: [
//     'https://cdn.bootcss.com/axios/0.21.1/axios.min.js',
//     'https://unpkg.com/browse/ant-design-vue@1.7.5/dist/antd.min.js',
//   ],
// };

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
        Assets: resolvePath('/src/assets'),
        Api: resolvePath('/src/api'),
        Coms: resolvePath('/src/components'),
        Views: resolvePath('/src/views'),
        Config: resolvePath('/src/config'),
        Util: resolvePath('/src/utils'),
        Store: resolvePath('/src/store'),
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
      new AntdDayjsWebpackPlugin(),
      new CompressionPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: productionGzipExtensions,
        threshold: 10240, // 只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0。
        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理。默认值是 0.8。
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
  chainWebpack: config => {
    // config.plugins.delete('prefetch'); // 预先加载模块 关闭
    // config.plugin('html').tap(args => {
    //   // 生产环境或本地需要cdn时，才注入cdn
    //   if (isProduction && isNeedCdn) {
    //     args[0].cdn = cdn;
    //   }
    //   return args;
    // });

    if (isProduction) {
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          mozjpeg: { progressive: true, quality: 65 },
          optipng: { enabled: false },
          pngquant: { quality: [0.65, 0.9], speed: 4 },
          gifsicle: { interlaced: false },
          // webp: { quality: 75 }
        })
        .end();
    }
  },
};
