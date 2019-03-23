# syzoj-ng-app

syzoj-ng 的前端组件。

## 设计

syzoj-ng-app 是用 Create React App 实现的 SPA 前端，将尽可能多的静态资源交给 Webpack 管理，使客户端和服务器之间的交互仅限于数据本身，减少流量消耗。

使用 React Router 管理浏览历史，但由于设计原因，不用来实现路由功能，而是由服务器决定显示什么页面。

设计的目的是提高前端和后端的耦合，使后端对前端有完全、直接的控制，同时使前端、后端的代码能专注于功能，将交互逻辑抽象出来。核心的思想是将与服务器之间的交互交给 BaseComponent 处理，集中处理所有交互，使前端与后端高度耦合，让后端能够容易地控制前端的任何一个组件。

所有需要与服务器交互的组件需要继承 BaseComponent。BaseComponent 会把当前组件注册到一个全局的哈希表里，方便服务器对任何一个前端组件进行操作。前端的所有组件有一个路径名，从 url 传入，必须是唯一且不能改变的，如果必须要改变 url 就得重新加载组件。因此一般把 url 的最后一部分作为 key，在 url 改变时 key 也会改变，从而达到重新加载组件的效果。

url 用来唯一标识一个组件。顶部组件的 url 是 ""，当前显示页面的 url 是 "/page"，每一个组件的 url 是其父亲的 url 加上 "/" 再加上 key。例如，题库页面最顶层组件的 url 是 ""，页面本身的 url 是 "/page"，具体的题目的 url 是 "/page/problem-entry/xxxxx"，其中 xxxxx 应该用来标识这个题目。编写 Component 的时候应该注意给每个 Component 拼接合适的 url。

每个组件会有一个 data 参数，这个参数总是由服务器提供，需要各个 component 一级级下传。这个参数的格式在 api.proto 里定义。

BaseComponent 实现以下功能：

- 与服务器交互
  继承 BaseComponent 后就可以调用 doAction 函数，有两个参数 action 和 data，表示操作名和数据。组件不应该直接调用 fetch 等函数，只能静候服务器调用当前组件的函数。
  doAction 会自动根据当前组件的 url 拼接出实际的请求，让服务器知道是哪个组件在调用 doAction。
- 从服务器获取数据
  服务器会向客户端发送若干个三元组，为 (url, method, data). url 用来标识组件，method 表示方法，data 是唯一的参数。只有继承 BaseComponent 才能允许服务器调用自己组件，显示出具体的内容。

一般来说打开一个全新的页面的过程如下：

- url 为 "" 的顶级组件会向服务器发送一个请求，内容是浏览器地址栏的 URL。
- 服务器发送三元组 ("", "setBody", {...})，调用顶级组件的 "setBody" 方法，返回一个 Any 消息。顶级组件调用 any 组件渲染页面，并且 any 组件的 url 是 "/page"。
- any 组件接受 data 参数，根据 @type 的值找到合适的组件来渲染整个页面，把 data 传给对应的组件，并保留 url 等 props。
- 对应的组件根据 data 参数渲染页面。

以修改题面为例，进行一个操作的流程如下：

- 假设当前的地址是 “/problem/111”。url 为 "/page/problem" 的组件会渲染当前题目的题面。
- 用户点击“保存”按钮。
- 组件显示“保存中”并禁用保存按钮。
- 组件调用 doAction 向服务器发送一个请求，method 是 "save"，data 是新的题面。
- BaseComponent 根据地址栏、url 和 method 拼接出请求，结果是 "/api/problem/111/page/problem/save"，类型是 POST，内容是 data。
- 服务器处理请求，然后返回 ("/page/problem", "done", {})。
- BaseComponent 解析请求，调用组件的 done 函数，参数是 {}。
- 组件的 done 函数被调用，显示“保存成功”，保存按钮重新显示。
