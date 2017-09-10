## 组件
```jsx
class PageHeader extends Component {
  render () {
    return (
      <div>
        <h1>React Pain</h1>
      </div>
    )
  }
}

ReactDOM.render(
  <PageHeader />,
  document.getElementById('app')
)
```
```jsx
var PageHeader = React.createClass({
  render () {
    return (
      <div>
        <h1>React Pain</h1>
      </div>
    )
  }
});
```

### render
`ReactDOM.render` 渲染组件并构造 `DOM` 树，然后插入到页面上特定的元素上；组件类必须要实现 `render` 方法，并返回一个 `JSX` 元素，返回的 `JSX` 对象必须要用一个外层的 `JSX` 元素包裹起来

### JSX
`JSX` 中可以插入 `JavaScript` 表达式，表达式用 {} 包裹，结果渲染到页面上
#### 变量插入
```jsx
render () {
  const msg = 'perfect'
  return (
    <div>
      <h1>React.js {msg}</h1>
    </div>
  )
}
```
```jsx
render () {
  const className = 'wrapper'
  return (
    <div className={className}>
      <h1>React.js</h1>
    </div>
  )
}
```
#### JSX 插入
```jsx
render () {
  const username = 'pain'

  // JSX 中可以放置任何表达式内容包括 JSX
  return (
    <div>
      <h1>
        Hello { username ? <span>,{username}</span> : null }
      </h1>
      <h1>
        Hello{username ? `, ${username}` : null}
      </h1>
    </div>
  )
}
```
#### JSX 变量
JSX 元素可以赋值给变量，或者作为函数参数、或者作为函数的返回值
```jsx
render () {
  const status = true

  const successMsg = <span> ok</span>
  const errMsg = <span> error</span>
  return (
    <div>
      <h1>
        Learn React.js
        {status ? successMsg : failMsg}
      </h1>
    </div>
  )
}
```
#### 函数表达式
```jsx
render () {
  return (
    <div>
      <h1>Hello {(function () { return 'pain'})()}</h1>
    </div>
  )
}
```

### 数据渲染
#### 数组
React.js 会把数组里面元素罗列并且渲染出来
##### 简单数组
```
class ArrayData extends Component {
  render () {
    return (
      <div>
        {[
          <span>React.js </span>,
          <span>is </span>,
          <span>perfect</span>
        ]}
      </div>
    )
  }
}
```
##### JSX 数组
- 方式一
```
const users = [
  { username: 'Jerry', age: 21, gender: 'male' },
  { username: 'Tomy', age: 22, gender: 'male' },
  { username: 'Lily', age: 19, gender: 'female' },
  { username: 'Lucy', age: 20, gender: 'female' }
]

class MapData extends Component {
  render () {
    const userArr = []
    for (let user of users) {
      userArr.push(
        <div>
          <div>Username: {user.username}</div>
          <div>Age: {user.age}</div>
          <div>Sex: {user.gender}</div>
          <hr />
        </div>
      )
    }

    return (
      <div>{userArr}</div>
    )
  }
}
```
- 方式二
```jsx
class ArrData extends Component {
  render () {
    return (
      <div>
        {users.map((user) => {
          return (
            <div>
              <div>Username: {user.username}</div>
              <div>Age: {user.age}</div>
              <div>Sex: {user.gender}</div>
              <hr />
            </div>
          )
        })}
      </div>
    )
  }
}
```
- 方式三
```
class User extends Component {
  render () {
    const { user } = this.props
    return (
      <div>
        <div>Username: {user.username}</div>
        <div>Age: {user.age}</div>
        <div>Sex: {user.gender}</div>
        <hr />
      </div>
    )
  }
}
```
用表达式套数组罗列到页面上的元素，要为每个元素加上 `key` 属性，`key` 为元素唯一标识
```
class ArrData extends Component {
  render () {
    return (
      <div>
        {users.map((user, i) => <User user={user} key={i} />)}
      </div>
    )
  }
}
```

### 组件组合
```jsx
class PageTitle extends Component {
  render () {
    return (
      <div>
        <h1>React.js</h1>
      </div>
    )
  }
}

class PageHeader extends Component {
  render () {
    return (
      <div>
        <PageTitle />
        <PageTitle />
        <h2>This is Header</h2>
      </div>
    )
  }
}
```

### 事件
React.js 提供一系列的 on* 属性用来监听事件，没有经过特殊处理这些 on* 事件监听只能用于普通 HTML 标签，而不能用在组件标签上
```jsx
class PageTitle extends Component {
  handleClickOnTitle () {
    console.log('Click on title')
  }

  render () {
    return (
      <div>
        <h1 onClick={this.handleClickOnTitle}>React.js</h1>
      </div>
    )
  }
}
```
#### event
事件监听函数会被自动传入一个 `event` 对象
```jsx
class Title extends Component {
  handleClickOnTitle (e) {
    console.log(e.target.innerHTML)
  }

  render () {
    return (
      <div>
        <h1 onClick={this.handleClickOnTitle}>React.js</h1>
      </div>
    )
  }
}
```
若要在事件处理函数中使用当前实例，需要将实例方法 `bind` 到当前实例上
```jsx
class Title extends Component {
  handleClickOnTitle (e) {
    console.log(this)
  }

  render () {
    return (
      <div>
        <h1 onClick={this.handleClickOnTitle.bind(this)}>React.js</h1>
      </div>
    )
  }
}
```
在 `bind` 的时候给事件监听函数传入一些参数
```jsx
class Title extends Component {
  handleClickOnTitle (msg, e) {
    console.log(e.target.innerHTML)
    console.log(msg)
    console.log(this)
  }

  render () {
    return (
      <div>
        <h1 onClick={this.handleClickOnTitle.bind(this, 'Hello')}>React.js</h1>
      </div>
    )
  }
}
```
事件处理绑定多个函数
```jsx
class Dog extends Component {
  constructor () {
    super()
    this.state = {
      isRunning : false,
      isBarking : false
    }
  }

  bark () {
    console.log("bark..")
    this.setState({isBarking : true})
    setTimeout(() => this.setState({ isBarking: false }), 20)
  }

  run () {
    console.log("run...")
    this.setState({isRunning : true})
    setTimeout(() => this.setState({ isRunning: false }), 20)
  }

  // 有括号表示函数调用
  render () {
    return (
      <div onClick={() => {this.bark(); this.run()}}>
        <h1>A dog</h1>
      </div>
    )
  }
}
```

### state
`setState` 方法由父类 `Component` 提供，通过该方法更新组件的状态并重新调用 `render` 方法，重新渲染页面
```jsx
class LikeButton extends Component {
  constructor () {
    super()
    this.state = { isLiked: false }
  }

  handleClickOnLikeButton () {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  render () {
    return (
      <div>
        <button onClick={this.handleClickOnLikeButton.bind(this)}>
          {this.state.isLiked ? '取消' : '点赞'} 👍
        </button>
      </div>
    )
  }
}
```
调用 `setState` 时并不会马上修改 `state`，而是把更新对象放到一个队列，稍后从队列中把新的状态提取出来合并到 `state` 中，再触发组件更新
```jsx
class CountButton extends Component {
  constructor () {
    super()
    this.state = { count : 0 }
  }

  // 上一个 setState 的结果传入这个函数，返回一个对象作为更新 state 的对象
  handleClickOnLikeButton () {
    this.setState((prevState) => {
      return { count: prevState.count + 1 }
    })
  }

  render () {
    let N = this.state.count;
    const msg1 = <span>有({N})条未读消息</span>
    const msg2 = <span>没有未读消息</span>
    return (
      <div>
        <button onClick={this.handleClickOnLikeButton.bind(this)}>
          {N > 0 ? msg1 : msg2}
        </button>
      </div>
    )
  }
}
```
`getInitialState` 用于定义初始状态
```
var LikeButton = React.createClass({
  getInitialState () {
    return {liked: false};
  },

  handleClick (event) {
    this.setState({liked: !this.state.liked});
  },

  render: function() {
    const text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    );
  }
});

ReactDOM.render(
  <LikeButton />,
  document.getElementById('app')
);
```


### props
每个组件都有一个 `props` 对象属性，包含所有对这个组件的配置
#### 获取 props
```jsx
class LikeButton extends Component {
  constructor () {
    super()
    this.state = { isLiked: false }
  }

  switch () {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  render () {
    const likedText = this.props.likedText || '取消'
    const unlikedText = this.props.unlikedText || '点赞'
    return (
      <div>
        <button onClick={this.switch.bind(this)}>
          {this.state.isLiked ? likedText : unlikedText} 👍
        </button>
      </div>
    )
  }
}
```
#### 设置 props
把参数放在标签的属性当中，所有的属性都会作为 `props` 对象的键值
##### 字符串参数
```
class Index extends Component {
  render () {
    return (
      <div>
        <LikeButton likedText='已赞' unlikedText='赞' />
      </div>
    )
  }
}
```
##### 对象参数
```
class Index extends Component {
  render () {
    return (
      <div>
        <LikeButton
          wordings={{likedText: '已赞', unlikedText: '赞'}} />
      </div>
    )
  }
}
```
##### 函数参数
```jsx
class Index extends Component {
  render () {
    return (
      <div>
        <LikeButton
          onClick={() => console.log('Click on like button!')} />
      </div>
    )
  }
}
```
##### defaultProps
组件默认配置可以通过 `||` 操作符来实现，但 `React.js` 提供了 `defaultProps`为默认配置
```
class LikeButton extends Component {
  static defaultProps = {
    likedText: '取消',
    unlikedText: '点赞'
  }

  constructor () {
    super()
    this.state = { isLiked: false }
  }

  switch () {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  render () {
    return (
      <button onClick={this.switch.bind(this)}>
        {this.state.isLiked
          ? this.props.likedText
          : this.props.unlikedText} 👍
      </button>
    )
  }
}
```
##### 修改 props
通过改变传入 props 的值来改变 props
```
class Index extends Component {
  constructor () {
    super()
    this.state = {
      likedText: '已赞',
      unlikedText: '赞'
    }
  }

  switch () {
    this.setState({
      likedText: '取消',
      unlikedText: '点赞'
    })
  }

  render () {
    return (
      <div>
        <LikeButton
          likedText={this.state.likedText}
          unlikedText={this.state.unlikedText} />
        <div>
          <button onClick={this.switch.bind(this)}>
            switch
          </button>
        </div>
      </div>
    )
  }
}
```
##### state 与 props
1. `state` 的主要作用是用于组件保存、控制、修改自己的可变状态，并在组件内部初始化且可被组件自身修改，而外部不能访问也不能修改
2. `props` 的主要作用是让使用该组件的父组件可以传入参数来配置该组件，是外部传进来的配置参数，组件内部无法控制也无法修改。除非外部组件主动传入新的 `props`，否则组件的 `props` 永远保持不变
3. 当某个状态被多个组件依赖或者影响时，就把该状态提升到这些组件的最近公共父组件中去管理，用 props 传递数据或者函数

### 函数式组件
```
const PageTitle = (props) => {
  const hello = (event) => console.log('hello world')
  return (
    <div onClick={hello}>Hello World</div>
  )
}
```

### 容器类组件
使用自定义组件时，可在其中嵌套 JSX 结构，React.js 把嵌套的 JSX 元素一个个都放到数组中，然后通过 props.children 传给组件，嵌套的结构在组件内部通过 `props.children` 获取
```
class Card extends Component {
  render () {
    return (
      <div className='card'>
        <div className='header'>
          {this.props.children[0]}
        </div>
        <div className='main'>
          {this.props.children[1]}
        </div>
      </div>
    )
  }
}
```
```
ReactDOM.render(
  <Card>
    <h1>Front-End</h1>
    <h1>React.js</h2>
    Subscribe：<input />
  </Card>,
  document.getElementById('app')
);
```
`this.props.children` 的值有三种可能：如果当前组件没有子节点为 `undefined` ；如果有一个子节点，数据类型是 `object`；如果有多个子节点，数据类型是 `array`

### 组件声明周期
```jsx
class PageHeader extends Component {
  constructor () {
    super()
    console.log('construct')
  }

  componentWillMount () {
    console.log('component will mount')
  }

  componentDidMount () {
    console.log('component did mount')
  }

  componentWillUnmount () {
    console.log('component unmount')
  }

  render () {
    return (
      <div>
        <h1 className='title'>React.js</h1>
      </div>
    )
  }
}
```
```jsx
class Index extends Component {
  constructor () {
    super()
    this.state = {
      status : true
    }
  }

  switch () {
    this.setState({
      status : !this.state.status
    })
  }

  render () {
    return (
      <div>
        {this.state.status ? <PageHeader /> : null}
        <button onClick={this.switch.bind(this)}>
          switch
        </button>
      </div>
    )
  }
}
```

1. constructor()
组件的 `state` 初始化
2. componentWillMount()
组件的启动工作，如 Ajax 数据拉取、定时器的启动
3. render()
4. 构造 DOM 元素插入页面
5. componentDidMount()
有些组件的启动工作是依赖 DOM，如动画启动，这些操作放在 `componentDidMount` 中
6. componentWillUnmount()
组件清理工作，例如定时器的清理
7. 从页面中删除

### DOM 操作
为元素加 `ref` 属性，属性值是一个函数，当元素挂载完成后，React.js 调用这个函数并且把这个挂载以后的 DOM 节点传给这个函数，获取的 DOM 节点可以在 `componentDidMount` 中使用
```
class AutoFocusInput extends Component {
  componentDidMount () {
    this.input.focus()
  }

  render () {
    return (
      <input ref={(input) => this.input = input} />
    )
  }
}
```
#### refs
```jsx
var MyComponent = React.createClass({
  handleClick () {
    this.refs.input.focus();
  },
  render: function() {
    return (
      <div>
        <input type="text" ref="input" />
        <input type="button" value="Focus the text input" onClick={this.handleClick} />
      </div>
    );
  }
});

ReactDOM.render(
  <MyComponent />,
  document.getElementById('app')
);
```

### 设置动态 HTML 结构
出于安全考虑，在 React.js 中所有的表达式插入的内容都会被自动转义，React.js 提供了一个属性 `dangerouslySetInnerHTML`，用于动态设置元素的 `innerHTML`
```
class Editor extends Component {
  constructor () {
    super()
    this.state = {
      content : '<h1>React.js</h1>'
    }
  }

  render () {
    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: this.state.content}} />
        <h1 style={{fontSize: '32px', color: 'red'}}>React.js</h1>
      </div>
    )
  }
}
```
style 属性接受包含 CSS 属性键值对的对象，用对象作为 style 方便我们动态设置元素的样式，可以用 `props` 或者 `state`中的数据生成样式对象再传给元素，然后用 `setState` 修改样式

### 参数验证
```sh
npm install --save prop-types
```
```jsx
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Comment extends Component {

  // 传入的 comment 类型必须为 object
  // 通过 isRequired 关键字来强制组件某个参数必须传入
  static propTypes = {
    comment: PropTypes.object.isRequired
  }

  render () {
    const { comment } = this.props
    return (
      <div className='comment'>
        <div className='comment-user'>
          <span>{comment.username} </span>：
        </div>
        <p>{comment.content}</p>
      </div>
    )
  }
}
```

### 表单
```
var Input = React.createClass({
  getInitialState: function() {
    return {value: 'hello'};
  },

  handleChange: function(event) {
    this.setState({value: event.target.value});
  },

  render: function () {
    var value = this.state.value;
    return (
      <div>
        <input type="text" value={value} onChange={this.handleChange} />
        <p>{value}</p>
      </div>
    );
  }
});

ReactDOM.render(
  <Input />,
  document.getElementById('app')
);
```