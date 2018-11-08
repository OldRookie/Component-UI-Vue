const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  chainWebpack: config => {
    config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
    //const svgRule = config.module.rule('svg')
    //svgRule.uses.clear()
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons')) //处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  configureWebpack: () => ({
    // resolve: {
    //   alias: require('./alias.config').webpack
    // }
    // module: {
    //   rules: [{
    //     test: /\.svg$/,
    //     use: [{
    //       loader: "svg-sprite-loader",
    //       options: {
    //         symbolId: 'icon-[name]'
    //       }
    //     }]
    //   }]
    // }
  })
}

// const path = require("path");
// const glob = require("glob");
// const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
// const vueLoaderConfig = {};

// function resolve(dir) {
//   return path.join(__dirname, "..", dir);
// }

// module.exports = {
//   configureWebpack:()=>({
//     module: {
//       rules: [
//         {
//           test: /\.svg$/,
//           use: 'svg-sprite-loader'
//         }
//       ]
//     }
//   }),
//   chainWebpack: config => {
//     // config.module.rules.delete("svg");

//     // config.module
//     //   .rule("svg")
//     //   .test(/\.(svg)(\?.*)?$/)
//     //   .use("file-loader")
//     //   .loader("svg-sprite-loader")
//     //   .options({
//     //     extract: true,
//     //     spriteFilename: "icons.svg"
//     //   });

//     // config.module
//     //   .rule("svg")
//     //   // .test(/\.(svg)(\?.*)?$/)
//     //   .test(/\.svg$/)
//     //   .include.add(resolve("src/icons"))
//     //   .end()
//     //   .use('svg-sprite-loader')
//     //   .loader('svg-sprite-loader')
//     //   .options({
//     //     symbolId: "icon-[name]"
//     //   });

//     // const svgRule = config.module.rule("svg");

//     // // clear all existing loaders.
//     // // if you don't do this, the loader below will be appended to
//     // // existing loaders of the rule.
//     // svgRule.uses.clear();

//     // // add replacement loader(s)
//     // svgRule
//     //   .test(/\.svg$/)
//     //   .include.add(resolve("src/icons"))
//     //   .end()
//     //   .use("svg-sprite-loader")
//     //   .loader("svg-sprite-loader")
//     //   .options({
//     //     symbolId: "icon-[name]"
//     //   });

//     // config.module.rules.delete('svg')

//     config.module.rule('svg').uses.delete('file-loader') 

//     config.module.rule('svg')
//       // .test(/\.svg$/)
//       // .test(/\.(svg)(\?.*)?$/)
//       .include.add(resolve("src/icons"))
//       .end()
//       .use("svg-sprite-loader")
//       .loader("svg-sprite-loader")
//       .options({
//         symbolId: "icon-[name]"
//       });

//     // config.plugin('svg-sprite')
//     //   .use(require('svg-sprite-loader/plugin'))
//   }
// };

// // module.exports = {
// //   chainWebpack: config => {
// //     // config.module.rules.delete("svg");

// //     // config.module
// //     //   .rule("svg-sprite-loader")
// //     //   .test(/\.svg$/)
// //     //   .include.add(resolve("src/icons")) //处理svg目录
// //     //   .end()
// //     //   .use("svg-sprite-loader")
// //     //   .loader("svg-sprite-loader")
// //     //   .options({
// //     //     symbolId: "icon-[name]"
// //     //   });

// //       config.module
// //             .rule('svg')
// //             .test(/\.(svg)(\?.*)?$/)
// //             .include
// //             .add(resolve('src/icons'))
// //             .end()
// //             .use('file-loader')
// //             .loader('svg-sprite-loader')
// //             .options({
// //                 symbolId: 'icon-[name]'
// //             })

// //     // config.plugin("svg-sprite").use(require("svg-sprite-loader/plugin"));
// //   }
// // };
