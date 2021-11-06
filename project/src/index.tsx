import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './components/app/app';
import { cities } from './mocks/cities';
import { reducer } from './store/reducer';
import { AuthorizationStatus } from './const';
import { createAPI } from './services/api';
import { requireAuthorization } from './store/action';
import { checkAuthAction, fetchOfferAction } from './store/api-actions';
import { ThunkAppDispatch } from './types/action';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOfferAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        cities={cities}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
