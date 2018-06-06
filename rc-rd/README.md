## 安装方式

```
nrm use snpm

npm i -S rc-redux
```

## 使用方式

```
// 在项目入口文件引入

import {render, models} from 'rc-redux';

render({
  component: <App />,                             // 主组件
  reducers: models,                               // 项目reducers状态文件
  container: document.getElementById('app'),      // 页面根节点
  dev: false,                                     // 是否开启chrome redux 调试插件
  extractReducer: {                               // 额外引入的第三方redux状态库
    form: reduxFormReducer
  }
});

// appmodel.js

import { model, actions } from 'rc-redux';

export default model({
  name: 'app', // model名称
  initialState: {
    appName: '',
  },
  reducers: {
    setAppName(state, text) {
      return {
        appName: text,
      };
    }
  },
  effects: {

  },
});


// app.jsx
import { actions } from 'rc-redux';

@connect(
  state => ({
    app: state.app,
  }),
  dispatch => ({
    appAc: bindActionCreators(actions.app, dispatch),
  })
);

export default class Index extends React.PureComponent {
  componentDidMoudnt() {
    this.props.appAc.setAppName('appname');
  }

  render() {
    return (
      <div className="app">{this.props.app.appName}</div>
    )
  }
}
```