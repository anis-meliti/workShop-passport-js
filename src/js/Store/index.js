import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../Reducers/index';
import thunk from 'redux-thunk';

const middleWare = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  data: null,
  isAuth: false
};
const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);
export default store;
