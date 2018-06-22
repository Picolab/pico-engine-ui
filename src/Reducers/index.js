import { combineReducers } from 'redux-immutable';
import settingsReducer from './settingsReducer';
import { List } from 'immutable';

const rootReducer = combineReducers({
  settings: settingsReducer
});

export default rootReducer;

/* REMINDER, the redux store is not a normal javascript object, but rather an Immutable JS Map.
{
  //settings is the saved state of the application. Each key in settings is an individual pico and its value is everything we
  //want to be persistent in our app
  settings: {
    <picoID>: {
      picoID: <picoID>,
      DID: <DID>,
      host: <host>,//this variable will be removed when we implement sovrin lookups
      collapsed: <boolean>, //whether or not the card is expanded or minimized
      position: {
        x: <number>,
        y: <number>
      },
      tab: <integer> //which tab on the expanded card was last selected. 0 is the first tab
    },
    ...
  },
  //picos is the cached state of the application. Data that may change often or will be re-retrieved on page refresh will be stored here
  picos: {
    <picoID>: {
      version: <versionNumber>,
      rulesets: ???,
      logs: ???,
      channels: ???,
      etc.
    },
    ...
  },
  relationships: {
    ???
  }
}
*/


//settings selectors
export function getDID(state, picoID) {
  return state.getIn(["settings", picoID, "DID"]);
}

export function getHost(state, picoID) {
  return state.getIn(["settings", picoID, "host"]);
}

export function isCollapsed(state, picoID) {
  return state.getIn(["settings", picoID, "collapsed"]);
}

export function getPosition(state, picoID) {
  return state.getIn(["settings", picoID, "position"]);
}

export function getTab(state, picoID) {
  return state.getIn(["settings", picoID, "tab"]);
}

//returns an Immutable List of picoID strings
export function getPicoIDList(state){
  let settings = state.get("settings");
  let returnList = [];
  settings.forEach((value, key) => {
    returnList.push(key);
  });
  return List(returnList);
}

//picos selectors

export function getVersion(state, picoID) {
  return state.getIn(["picos", picoID, "version"]);
}

export function getRulesets(state, picoID) {
  return state.getIn(["picos", picoID, "rulesets"]);
}

export function getLogs(state, picoID) {
  return state.getIn(["picos", picoID, "logs"]);
}

export function getChannels(state, picoID) {
  return state.getIn(["picos", picoID, "channels"]);
}

//relationships selectors
