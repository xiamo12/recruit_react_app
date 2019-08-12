const {
  override,
  fixBabelImports,
  addLessLoader,
} = require("customize-cra"); //react-app-rewired在2.x之后就不支持injectBabelPlugin方法了，需要安装customize-cra
//react-app-rewired：对antd-mobile进行自定义配置的社区解决方案。
//config.overrides.js：用于修改默认配置

module.exports = override( //override方法的第一个参数config就是webpack的配置
	fixBabelImports("import", {
	libraryName: "antd-mobile", libraryDirectory: "es", style: true// change importing css to less
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {  //less-loader的modifyVars方法，进行主题配置
      // "@primary-color": "#1DA57A",
      "@brand-primary": "#1cae82",
      "@brand-primary-tap": "#1DA57A",
    }
  })
);