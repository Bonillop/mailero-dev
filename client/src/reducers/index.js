// This file will handle the combineReducers

import { combineReducers } from 'redux';
// redux-form has its own reducer
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';

// Whatever keys that we pass to this object will represent the keys that exist on our state object
export default combineReducers({
  auth: authReducer,
  form: reduxForm
});