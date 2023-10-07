import { combineReducers } from 'redux';
import commonReducer from '../store/reducer/commonReducer'
import authReducer from './reducer/authReducer';


const appReducer = combineReducers({
  authReducer:authReducer,
  commonReducer:commonReducer,

});

export default appReducer;