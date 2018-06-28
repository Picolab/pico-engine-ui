import { call } from 'redux-saga/effects';
import { getEntryDID, getEntryHost } from '../config';
import { updateSettingsPosition } from '../utils/picoSDK';

export default function* updatePosition(action) {
  if(action.payload && action.payload.picoID && action.payload.x && action.payload.y){
    yield call(updateSettingsPosition, getEntryDID(), getEntryHost(), action.payload.picoID, action.payload.x, action.payload.y);
  }
  else {
    console.error("Invalid parameters in updatePosition!");
  }
}
