//eslint-disable-next-line
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_SUCCESS
} from '../constants/actions-types';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        data: payload,
        isAuth: true,
        loading: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: payload,
        isAuth: true,
        loading: false
      };
    case LOGIN_FAIL:
      return {
        ...state,
        data: payload,
        isAuth: false,
        loading: false
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        data: payload,
        isAuth: true,
        loading: false
      };
    default:
      return state;
  }
};
export default reducer;
