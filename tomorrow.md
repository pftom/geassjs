- 将所有的Reducer and Namespace桥接 [√]
- 将所有的Schedule与Redux Saga桥接 [√]
- 完成Store的创建，暴露出用户可以自定义的接口 [x] => 框架自己配置，暂时不允许扩展
- 完成全局Plugin System [√]

## 2018 年 2 月 26 日

- 形成 redux store 可配置

  - app.use()，单个插件

  - app.useAll()，一堆插件


- 注意开发和生产环境（体现在Redux Store）
- 开始使用Redux 生态圈增强Geass
  - plain object or immutable
  - redux-immutable
  - reselect
  - normalizr
  - redux-persist
  - redux-router
  - redux-devtools/redux-devtools-extension
  - react-router-redux
  - redux-form
- 全局通用的Fetch或者自己配置HTTP？
- SSR
- Use with Nextjs
- Use in Reactnative，Electron
- 路由
- 一些动画过渡的加入。【Css生态圈】