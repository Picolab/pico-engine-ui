import { combineReducers } from 'redux-immutable';
import settingsReducer from './settingsReducer';
import picosReducer from './picosReducer';
import snackbarQueueReducer from './snackbarQueueReducer';
import { List, Map } from 'immutable';

/*
const rootReducer = combineReducers({
  settings: settingsReducer,
  picos: picosReducer,
  snackbarQueue: snackbarQueueReducer
});
*/

const rootReducer = (state = Map({}), action) => {
  return new Map({
  settings: settingsReducer(state.settings, action),
  picos: picosReducer(state.picos, action),
  snackbarQueue: snackbarQueueReducer(state.snackbarQueue, action)
  })
}
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
      position: {   //position in state is only in sync with position saved in pico when page is loaded
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
      name: <name>,
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
  },
  //a snackbarQueue is used to easily display messages without having to write your own snackbar.
  //Just dispatch an addSnackbarMessage action to the store and it will be displayed for you
  //See https://material.io/design/components/snackbars.html# for best practices
  snackbarQueue: [{
    message: <string>, //should be relatively short
    action: { //OPTIONAL
      btnText: <string>, //the button text. This should be no longer than a few characters. i.e. UNDO, RETRY, REDO etc.
      func: <function>, //an action creator that will be dispatched to the redux store with the specified parameters below
      funcParams: <array> //any parameters you want to pass to your function. No parameters will be passed by default
    },//a snackbar may have an optional action (only one) that a user may want to perform.
    key: <string>//unique identifier for the application. Will be autogenerated by the reducer
  },
  ...]
}
*/


//settings selectors
export function getSettings(state) {
  return state.get("settings");
}

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
  if (Map.isMap(settings)) {
    settings.forEach((value, key) => {
      returnList.push(key);
    });
  } else {
    console.log("settings retrieved badly, this function got: ", settings);
  }
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

export function getName(state, picoID) {
  return state.getIn(["picos", picoID, "name"]);
}

//relationships selectors
//snackbarQueue selectors
export function getSnackbarQueue(state) {
  return state.get("snackbarQueue");
}
