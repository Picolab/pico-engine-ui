import { call, put } from 'redux-saga/effects';
import { removeSettingsEntry, getPicoId } from '../utils/picoSDK';
import { getEntryDID, getEntryHost } from '../config';
import { retrieveSettings } from '../actions';

export default function* removePicoFromView(action) {
  if(action.payload && action.payload.DID && action.payload.host && action.payload.picoID) {
    const picoID = action.payload.picoID;
    try {
      //see if the picoID is the entry pico id. If it is, don't remove it
      const result = yield call(getPicoId, getEntryDID(), getEntryHost());
      const entryPicoID = result.data
      if(entryPicoID && typeof entryPicoID === "string"){
        if(entryPicoID !== picoID) {
          yield call(removeSettingsEntry, getEntryDID(), getEntryHost(), action.payload.picoID);
          yield put(retrieveSettings());
        }else {
          alert("You cannot remove the entry pico from view!")
        }
      }else {
        console.error("Malformed response in removePicoFromView! Expected entryPicoID to be a string, received:", entryPicoID);
      }
    }catch(e) {
      console.error(e);
      if(e.response && e.response.data && e.response.data.error){
        alert("Error: " + e.response.data.error);
      }
      //could dispatch an error warning of the problem
    }
  }else {
    console.error("Invalid parameters in removePicoFromView! Action:", action);
  }
}
