import React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import 'react-toastify/dist/ReactToastify.css';

import registerServiceWorker from './registerServiceWorker';
import {HashRouter} from 'react-router-dom';
import './assets/styles/base.scss';
import App from './pages/App';
import configureStore from './config/configureStore';
import {Provider} from 'react-redux';

export const store = configureStore();
const rootElement = document.getElementById('root');

const root = ReactDOMClient.createRoot(rootElement);

const renderApp = Component => {
  // eslint-disable-next-line
  root.render(
    <Provider store={store}>
      <HashRouter>
        <Component />
      </HashRouter>
    </Provider>
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept('./pages/App', () => {
    const NextApp = require('./pages/App').default;
    renderApp(NextApp);
  });
}

registerServiceWorker();
