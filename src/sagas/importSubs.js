import { call, select, put } from 'redux-saga/effects';
import { getSubs, getPicoId, newSettingsEntry } from '../utils/picoSDK';
import { getSettings } from '../reducers';
import { getEntryDID, getEntryHost } from '../config';
import { retrieveSettings, addSnackbarMessage } from '../actions';

export default function* importSubs(action) {
  if(action.payload && action.payload.DID && action.payload.picoID && action.payload.picoName && action.payload.host) {
    try {
      //query for subscriptions
      const result = yield call(getSubs, action.payload.DID, action.payload.host);
      const subs = result.data;
      if(subs && Array.isArray(subs)){
        //for every subscription, see if it is already in the view by querying for its ID, and checking its existence in the settings variable
        const settings = yield select(getSettings); //remember that this returns an Immutable JS Map
        let newEntries = 0;
        for(let i = 0; i < subs.length; i++) {
          const currentSub = subs[i];
          //if the subscription doesn't have a Tx_host, that means it is on the same host as the pico querying for that data
          const currentSubHost = currentSub.Tx_host || action.payload.host;
          try{
            const idResult = yield call(getPicoId, currentSub.Tx, currentSubHost);
            const subId = idResult.data;
            if(subId && typeof subId === "string") {
              if(!settings.has(subId)){
                yield call(newSettingsEntry, getEntryDID(), getEntryHost(), subId, currentSub.Tx, currentSubHost);
                newEntries++;
              }//else it already exists in our app
            }else{
              console.error("Malformed response in importSubs when querying for subscription id! Expected string in idResult, received", idResult);
            }
          }catch(e) {
            //this would fail if the subscription is unreachable or if the permission denies this request for some reason
            console.error(e);
          }
        }
        if(subs.length === 0) {
          yield put(addSnackbarMessage(action.payload.picoName + " has no subscriptions to display."));
        }else{
          //update the settings variable if new entries were added
          if(newEntries > 0) {
            yield put(retrieveSettings());
          }else {
            yield put(addSnackbarMessage("All the subscriptions of " + action.payload.picoName + " are already in view."));
          }
        }
      }else{
        console.error("Malformed response in importSubs saga! Expected array in data, instead got", subs);
      }
    }catch(e) {
      console.error(e);
      if(e.response && e.response.data && e.response.data.error){
        alert("Error: " + e.response.data.error);
      }
      //could dispatch an error warning of the problem
    }
  }else {
    console.error("Invalid parameters in importSubs!", action);
  }
}
