import axios from 'axios';
import {
  LOAD_FAIL,
  LOAD_SUCCESS,
  REGISTER_SUCCESS
} from '../constants/actions-types';

export const logInUser = user => async dispatch => {
  try {
    const logRes = await axios.post('/login', user);
    console.log('TCL: logRes', logRes);
    if (logRes.status === 200) {
      localStorage.setItem('token', logRes.data.token);
      dispatch({
        type: LOAD_SUCCESS,
        payload: logRes.data
      });
    }
  } catch (error) {
    console.error(error);
  }
};
export const registerUser = user => async dispatch => {
  try {
    const logRes = await axios.post('/register', user);
    if (logRes.status === 200)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: logRes.data
      });
  } catch (error) {
    console.error(error);
  }
};

export const loadUser = token => async dispatch => {
  const config = {
    headers: {
      Authorization: token
    }
  };
  try {
    const loadedUser = await axios.get('/current', config);
    console.log('TCL: loadedUser', loadedUser);
    if (loadedUser === 'Unauthorized') {
      dispatch({
        type: LOAD_FAIL
      });
    } else {
      dispatch({ type: LOAD_SUCCESS, payload: loadedUser });
    }
  } catch (error) {
    console.error(error);
  }
};
