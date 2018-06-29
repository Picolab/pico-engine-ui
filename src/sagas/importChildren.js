import { call, select, put } from 'redux-saga/effects';
import { getChildren, newSettingsEntry } from '../utils/picoSDK';
import { getSettings } from '../reducers';
import { getEntryDID, getEntryHost } from '../config';
import { retrieveSettings, addSnackbarMessage } from '../actions';

export default function* importChildren(action) {
  if(action.payload && action.payload.DID && action.payload.picoID && action.payload.picoName && action.payload.host) {
    try {
      //query for wrangler children
      const result = yield call(getChildren, action.payload.DID, action.payload.host);
      const children = result.data;
      if(children && Array.isArray(children)) {
        //foreach child that doesn't already exist in our app, create a new entry in the settings entity variable on the entry pico
        const settings = yield select(getSettings); //remember that this returns an Immutable JS Map
        let newEntries = 0;
        for(let i = 0; i < children.length; i++){
          let child = children[i];
          if(!settings.has(child.id)) {
            newEntries++;
            //action.payload.host is assumed to be the child's host, because children are hosted on the same engine. This will no longer be necessary once sovrin DID lookups are in place
            yield call(newSettingsEntry, getEntryDID(), getEntryHost(), child.id, child.eci, action.payload.host);
          }//else it already exists in our app
        }
        if(children.length === 0) {
          yield put(addSnackbarMessage(action.payload.picoName + " has no children to display."));
        }else{
          //update the application settings variable by dispatching the retrieveSettings action
          if(newEntries > 0) {
            yield put(retrieveSettings());
          }else {
            yield put(addSnackbarMessage("All the children of " + action.payload.picoName + " are already in view."));
          }
        }
      }else {
        console.error("data in result does not contain an array (importChildren saga)! data:", children);
      }
    }catch(e) {
      console.error(e);
      //could dispatch an error warning of the problem
    }
  }else {
    console.error("Invalid parameters in importChildren!", action);
  }
}
