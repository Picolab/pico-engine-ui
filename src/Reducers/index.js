import { combineReducers } from 'redux-immutable';
import versionReducer from './versionReducer';

const rootReducer = combineReducers({
  version: versionReducer
});

export default rootReducer;


//selectors
export function getVersion(state){
  return state.get("version")
}
