# Geass

Lightweight, Blazing fast, based on [react](https://reactjs.org/), [redux](https://redux.js.org/), [angular-styled](https://angular.io/)，[functional-featured](https://en.wikipedia.org/wiki/Functional_programming) front-end framework.

Geass 是为了获取急速的开发速度而生的前端框架，它基于社区现有的优秀解决方案，并对其进行了一层简单的封装，力求在React的极简，Redux的可信赖，以及Angular的优秀之间取得一种合理的平衡。

<div align="center">
    <img width="500" heigth="800" src="./intuition.jpg">
  <br>
  <br>
</div>

# Features

Geass 追求组件化，每个组件都是一个独立的单元，通过组合各种组件来完成应用程序的编写。

Geass 的每个组件包含三个文件，追求视图（使用React），样式（使用[Css Modules](https://github.com/css-modules/css-modules)），和逻辑（使用ES6 的Class，还有React，Redux，React-Router等）分离，并将提供 **CLI** 工具帮助一行命令快速创建一个标准组件。

Geass 提供 `dispatch` API方法将三类 Action（路由，Http请求，本地事件）统一化处理，强调明确你目前在做的事。

- Http 请求：

  ```javascript
  dispatch(
    { type: [requestMethod]: string },
    { name: [handleMethod]: string, payload?: [handlePayload]: string }
  )
  ```

  dispatch 有两个参数：

- 第一个参数:：`{ type: [requestMethod]: string }`，requestMethod = 'http' | 'local' | 'route' ，分别代表Http请求，本地事件处理，以及路由动作的处理
  - 第二个参数：`{ name: [handleMethod]: string, payload: [handlePayload]: string }` handleMethod 代表相应的处理函数和要传给处理函数的数据。

  然后这个 type，name，payload 又是一个数组，使得用户在一处可以进行多种类型事件的处理。


接下来我将会一步一步的讲解这其中的奇思妙想。但是，在吃糖之前，让我们先卧薪尝胆一波。

在原始的React里面，你肯能会写出如下的代码：

  举例如下：

  ```javascript
// 下面对比使用Geass前后的React组件书写变化

// 没有使用Geass之前
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
      	<p>{this.props.nowNumber}</p>
      	<button onClick={this.props.handlePlusNumber}>plus</button>
        <button onClick={this.props.handleMinusNumber}>minus</button>
      </div>
    );
  }
}
  ```

  上面的 `handlePlus`  其实是个黑盒子，对吧，虽然最后 `nowNumber` 实际上是发生了变化，但是我们无法确定这个函数里面到底发生了什么：

- 它内部还可能是发起了路由跳转 `route state`


- 它内部可能只是单纯的修改了本地状态 `local state` ，这个状态在退出应用之后就会销毁。
- 它内部可能对远程数据库发起了请求，修改了远程状态 `remote state` ，这个状态将被永久保存。

上面提到的问题是非常显而易见的，而且也是目前绝大多数应用的一个通病，这样的代码显然难以维护，因为你在写完之后，过一段时间再来读以上代码，一个简单的 `handlePlus` 并不能给你提供很多有用的信息对吧？为了弄懂这个函数在背后做了什么事情，你不得不深入这个函数的内部逻辑，去一行一行的阅读其代码，这已经够恐怖了吧？但是更恐怖的是，万一这一行一行的代码又只有很少的注释，太啦！简直是地狱。

其实，也没那么恐怖啦，花点功夫，我们能将函数名改造得更易懂：

- 如果内部发起了路由跳转，我们可以这样来写，`handleChangeRoutePlusNumber`
- 如果内部只是单纯的改变了本地的 `nowNumber` 不引起其他动作，那么我们可以这么写：`handleLocalPlusNumber`
- 如果内部发起了远程请求，那么我们就可以这样来写：`handleRemotePlusNumber`

好了，我们将函数名增长了许多，这样能明确表达我们这个函数将要完成的动作了，以后进行代码维护时，也不用过多的去深入这个函数的细节就能读懂这段代码，大功告成，看到这里，可能你觉得这样子已经比较好了，好了你可以离开这里了。

你没有走。

还不走？

好吧，我知道你还想继续看下去，因为如果只是简单的进行上面的改进，那么Geass也就没有存在的必要了。

让我们再仔细想一想，然后你会猛然惊醒...

因为我们上面其实只是针对了一种情况进行处理，那么如果你的这个函数内部不仅要修改路由状态，还要修改本地其他状态，例如：

- 首先修改 `nowNumber`
- 然后修改路由状态

 甚至会对远程的状态进行改变呢？思路转得快的同学可能会马上想到如下的答案：`handleChangeRouteAndLocalPlusNumber` ，这还好，还不是很恐怖。

那么再来补一刀，这个函数里面还要进行远程数据库的读取：我们可能要这么写：`handleChangeRouteAndLocalAndRemotePlusNumber`。

这下你可见识到了想要在明确函数动作所付出的冗长的函数名的代价是巨大的。

接下来，我们来体会一下经过Geass改进后的React组价的写法。

先看例子：

```javascript
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
      	<p>{this.props.nowNumber}</p>
      	<button onClick={
      		dispatch(['local'], ['handlePlusNumber'])
  		}>plus</button>
        <button onClick={
			dispatch(['local', ['handleMinusNumber']])
        }>minus</button>
      </div>
    );
  }
}
```

然后我们开始扩展：

如果 `Plus` 那个函数内部还做了对路由状态的改变，我们可以这么写：

```javascript
dispatch(['local', 'route'], ['handlePlusNumber', 'handleChangeRoute'])
```

函数第一个参数和第二个参数中，两数组的参数第一个相对应，第二个参数相对应。

哈哈哈，怎么样，我们在一次调用里面，做了两件事，处理了两件情况，并标注了每件情况对应的类型和相应的处理函数，每个处理函数都只做一件类型事，这样，我们完成本次代码的编写之后，发布上线，等到其他人来看这段代码时，我们基于约定，就能很容易的确认这段代码做了什么事，而不用深入了解其处理函数背后的细节。