下面是 Router 部分，使用 React-Router v4 ，Dynamic Router

动态路由，路由就相当于 Component，所以不用特殊对待

```javascript
  import {
    BrowserRouter as Router,
    Route,
    Link,
  } from 'geassjs/react-router-dom';

  import React, { PureComponent } from 'geassjs/react';

  class Home extends PureComponent {
    render() {
      return (
        <div>MyHome</div>
      );
    }
  }

  export default class App extends PureComponent {
    render() {
      return (
        <Router>
          <div>
            <Route exact path='/' component={Home} />
          </div>
        </Router>
      )
    }
  }
```

