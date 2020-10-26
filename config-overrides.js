const { override,
    fixBabelImports,
    addWebpackAlias,
    addDecoratorsLegacy,
    addBabelPlugins } = require('customize-cra');
const path = require('path');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    }),
    addWebpackAlias({
        assets: path.resolve(__dirname, "./src/assets"),
        api: path.resolve(__dirname, "./src/api"),
        store:path.resolve(__dirname,"./src/store"),
    }),
    addDecoratorsLegacy(), // 配置装饰器
    ...addBabelPlugins(
        [
            "styled-jsx/babel",
            { "plugins": ["styled-jsx-plugin-sass"] }
        ]
    ),
);