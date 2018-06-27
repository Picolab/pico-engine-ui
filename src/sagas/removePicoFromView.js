import { call, put } from 'redux-saga/effects';
import { removeSettingsEntry } from '../utils/picoSDK';
import { getEntryDID, getEntryHost } from '../config';
import { retrieveSettings } from '../actions';

export default function* removePicoFromView(action) {
  if(action.payload && action.payload.DID && action.payload.host && action.payload.picoID) {
    try {
      yield call(removeSettingsEntry, getEntryDID(), getEntryHost(), action.payload.picoID);
      yield put(retrieveSettings());
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
