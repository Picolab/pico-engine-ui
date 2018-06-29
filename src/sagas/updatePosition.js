import { call } from 'redux-saga/effects';
import { getEntryDID, getEntryHost } from '../config';
import { updateSettingsPosition } from '../utils/picoSDK';

export default function* updatePosition(action) {
  if(action.payload && action.payload.picoID && (action.payload.x || action.payload.x === 0) && (action.payload.y || action.payload.y === 0)){
    yield call(updateSettingsPosition, getEntryDID(), getEntryHost(), action.payload.picoID, action.payload.x, action.payload.y);
  }
  else {
    console.error("Invalid parameters in updatePosition!", action.payload);
  }
}
