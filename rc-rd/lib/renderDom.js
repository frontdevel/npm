import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';

const render = ({component, reducers, container, dev, extractReducers}) => {
  const store = configureStore({models: reducers, dev, extractReducers});

  const Root = function Root() {
    return (
      <Provider store={store}>
        {component}
      </Provider>
    )
  }
  ReactDOM.render(<Root />, container)
}

export default render;