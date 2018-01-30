```javascript
  // app.view.js
  import React, { Component, PureComponent } from 'geassjs/react';

  // generate component => automate import stylesheet
  import './app.style.css';

  // 使用纯粹的React组件，享受React带来的巨大力量和生态圈。
  export default class App extends Component {
    // ...
  }
```


```javascript
  // app.component.js
  // 外部提供的API
  // Component 是React原生的，Model是一个装饰器函数
  import { Model } from 'geassjs';
  import { Component, PureComponent } from 'geassjs/react';

  // 内部自动使用
  import { connect } from 'react-redux';

  // import View Component
  import AppView from './app.view.js';

  @Model({
    template: AppView,
    mapStateToProps: (state) => {
      return { count: state.count };
    },
  })
  export class AppComponent extends Component {

  }


  // Model 实现
  function Model({ 
    template,
    mapStateToProps = () => {}, 
    mapDispatchToProps = () => {},
  }) {
    /* 
     * later add error hint.
     * h
     * h
     * h 
    */
    if (!template) {
      throw new Error('This component need template.')
    }

    return function (target) {
      // handle react component
      target.prototype.render = () => {
        return <template />;
      };

      // handle connect mapStateToProps
      return connect(mapStateToProps, mapDispatchToProps)
    }
  }
```

目前还不清楚对于一个React组件，是否普通的类也可以，如果可以就不需要下面的操作：

```javascript
  import React, { Component } from 'react';
  
  export default class App extends Component {

  }
```

想法完成：使用装饰器（decorator）来内部封装以下东西：

  - 对 `Component` 的继承 [x]- 使用了原生继承自React的 Component

  - connect 高阶函数的使用 [√]

  - 将 `render` 赋值为 `View` 层组件 [√] 

  - 自动导入Css [x]- 使用原生导入