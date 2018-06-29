import { call } from 'redux-saga/effects';
import { getEntryDID, getEntryHost } from '../config';
import { updateSettingsTab } from '../utils/picoSDK';

export default function* updateTab(action) {
  if (action.payload && action.payload.picoID && action.payload.tab !== null) {
    yield call(updateSettingsTab, getEntryDID(), getEntryHost(), action.payload.picoID, action.payload.tab);
  }
  else {
    console.error("Invalid parameters in updateTab!", action.payload);
  }
}
