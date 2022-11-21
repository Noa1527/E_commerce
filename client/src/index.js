import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk"
import rootReducer from './reducers'
// dev tools
import { composeWithDevTools } from "redux-devtools-extension";


const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk))
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);