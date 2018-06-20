import { combineReducers } from 'redux-immutable';
import versionReducer from './versionReducer';
import settingsReducer from './settingsReducer';

const rootReducer = combineReducers({
  settings: settingsReducer
});

export default rootReducer;


//selectors
export function getVersion(state){
  return state.get("version")
}
