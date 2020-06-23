// This file will handle the combineReducers

import { combineReducers } from 'redux';
import authReducer from './authReducer';

// Whatever keys that we pass to this object will represent the keys that exist on our state object
export default combineReducers({
  auth: authReducer
});