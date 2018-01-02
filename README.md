# Geass

Lightweight, Blazing fast, based on [react](https://reactjs.org/), [redux](https://redux.js.org/), [angular-styled](https://angular.io/)，[functional-featured](https://en.wikipedia.org/wiki/Functional_programming) front-end framework.

Geass 是为了获取急速的开发速度而生的前端框架，它基于社区现有的优秀解决方案，并对其进行了一层简单的封装，力求在React的极简，Redux的可信赖，以及Angular的优秀之间取得一种合理的平衡。

# Features

Geass 追求组件化，每个组件都是一个独立的单元，通过组合各种组件来完成应用程序的编写。

Geass 的每个组件包含三个文件，追求视图（使用React），样式（使用[Css Modules](https://github.com/css-modules/css-modules)），和逻辑（使用ES6 的Class，还有React，Redux，React-Router等）分离，并将提供 **CLI** 工具帮助一行命令快速创建一个标准组件。

Geass 提供 `dispatch` API方法将三类 Action（路由，Http请求，本地事件）统一化处理，强调明确你目前在做的事。

- Http 请求：

  ```javascript
  dispatch(
    { type: requestMethod },
    { name: actionName, payload: actionPayload },
    handleFunction,
  )
  ```

  dispatch 有三个参数：

  - 第一个参数:：`{ type: requestMethod }`，requestMethod = 'http' | 'local' | 'route' ，代表一个应用中能引起程序状态改变的三种动作之一。
  - 第二个参数：``
  - 第三个参数代表

  ​



