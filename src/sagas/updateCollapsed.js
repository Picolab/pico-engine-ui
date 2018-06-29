import { call } from 'redux-saga/effects';
import { getEntryDID, getEntryHost } from '../config';
import { updateSettingsCollapsed } from '../utils/picoSDK';

export default function* updateCollapsed(action) {
  if(action.payload && action.payload.picoID && action.payload.collapsed !== null) {
    yield call(updateSettingsCollapsed, getEntryDID(), getEntryHost(), action.payload.picoID, action.payload.collapsed);
  }
  else {
    console.error("Invalid parameters in updateCollapsed!", action.payload);
  }
}
