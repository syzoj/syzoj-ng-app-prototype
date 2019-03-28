# syzoj-ng-app

syzoj-ng 的前端组件。

## 约定

每个组件应该接受两个参数，为 data 和 url。
其中 data 是该组件负责显示的内容，来自父组件的 data。组件源代码第一行应该有一行，如下：

```javascript
// Corresponding message: syzoj.api.*****
```

表示该组件的 data 参数接受的数据类型。

url 唯一标识这个组件。url 应该根据父组件的 url 拼接得来，类似于 URL 的形式，方法是在父组件的 url 后加斜杠再加名称。例如页面本身的 url 一般是 "/page"，其中一道题目的 url 可能是 "/page/problem/xxxxx"。url 在整个组件的生命周期里不能改变，需要改变 url 就必须重新加载组件，因此组件应该有一个和 url 挂钩的 key 值，确保 url 改变时 key 也会改变。每个组件的 url 不能重复。

需要和服务器交互的 Component 都需要用 base_component.js 中的 withNetwork 包装起来，然后调用 this.props.network.doAction 发送请求。组件无法直接从 doAction 获取结果，但服务端可以调用组件的函数来发送结果。
