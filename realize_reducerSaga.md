```javascript
  import { Model } from 'geassjs';
  import { Component } from 'geassjs/react'

  import AppView from './app.view.js';

  @Model({
    namespace: 'app',
    template: AppView,
    mapStateToProps: (state) => {
      const { current, record } = state;

      return { 
        current: current,
        record: record,
      };
    },
  })
  export default class AppComponent extends Component {
    // the reducer init state
    state = {
      count: 0,
    };

    // handle async task
    effects = {
      *add(action) {
        const { put, call, delay } = this.props;
        yield call(delay, 1000);
        yield put({ type: 'minus' });
      },
    };

    // 外部有个枢纽控制整个Action的分发，和状态的处理
    reducers = {
      add(state) {
        const newCurrent = state.current + 1;
        
        return {
          ...state,
          record: newCurrent > state.record ? newCurrent : state.record,
          current: newCurrent,
        };
      },
      minus(state) {
        return {
          ...state,
          current: state.current - 1,
        };
      },
    };

  }

```

下面是Model的实现

```javascript
  // Model 实现
  function Model({ 
    namespace,
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

      target.prototype.namespace = namespace;

      // handle connect mapStateToProps
      return connect(mapStateToProps, mapDispatchToProps)
    }
  }
```

下面是AppView组件

```javascript
  import React, { Component } from 'react';

  export default class App extends Component {
    render() {
      return (
        <button onClick={() => dispatch({
          type: ['local'],
          name: 'app/add',
        })}>+</button>

        <button onClick={() => dispatch({
          type: ['local'],
          name: { value: 'add', namespace: 'app' },
        })}>+</button>
      )
    }
  }
```

下面是 Router 部分

```javascript

```