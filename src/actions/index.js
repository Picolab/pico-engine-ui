import axios from 'axios';
import { getEngineLoc, getEntryDID, getEntryHost } from '../config';
import { getSettings, getPicoName } from '../utils/picoSDK';

export function retrieveVersion(){
  const promise = axios.get(`${getEngineLoc()}/api/engine-version`)
  return {
    type: ActionTypes.RETRIEVE_VERSION,
    payload: promise
  }
}

export function retrieveSettings() {
  const promise = getSettings(getEntryDID(), getEntryHost())
  return {
    type: ActionTypes.RETRIEVE_SETTINGS,
    payload: promise
  }
}

export function retrieveName(DID, picoID, host) {
  const promise = getPicoName(DID, host);
  return {
    type: ActionTypes.RETRIEVE_PICO_NAME,
    payload: promise,
    meta: {
      picoID
    }
  }
}

export function importChildren(DID, picoID, picoName, host) {
  return {
    type: ActionTypes.IMPORT_CHILDREN,
    payload: {
      DID,
      picoID,
      picoName,
      host
    }
  }
}

export function importSubs(DID, picoID, picoName, host) {
  return {
    type: ActionTypes.IMPORT_SUBS,
    payload: {
      DID,
      picoID,
      picoName,
      host
    }
  }
}


export function updateSettingsPosition(picoID, x, y) {
  return {
    type: ActionTypes.UPDATE_POSITION,
    payload: {
      picoID,
      x,
      y
    }
  }
}

export function updateSettingsCollapsed(picoID, collapsed) {
  return {
    type: ActionTypes.UPDATE_COLLAPSED,
    payload: {
      picoID,
      collapsed
    }
  }
}

export function updateSettingsTab(picoID, tab) {
  return {
    type: ActionTypes.UPDATE_TAB,
    payload: {
      picoID,
      tab
    }
  }
}

export function removePicoFromView(DID, picoID, host) {
  return {
    type: ActionTypes.REMOVE_FROM_VIEW,
    payload: {
      DID,
      picoID,
      host
    }
  }
}

//parameter specs for this function are defined in index.js in the reducers folder
export function addSnackbarMessage(message, action) {
  return {
    type: ActionTypes.ADD_SNACKBAR,
    payload: {
      message,
      action
    }
  }
}

export function shiftSnackbarQueue() {
  return {
    type: ActionTypes.SHIFT_SNACKBAR
  }
}

const ActionTypes = {
  RETRIEVE_VERSION: 'retrieve_version',
  RETRIEVE_SETTINGS: 'retrieve_settings',
  RETRIEVE_PICO_NAME: 'retrieve_pico_name',
  IMPORT_CHILDREN: 'import_children',
  IMPORT_SUBS: 'import_subs',
  REMOVE_FROM_VIEW: 'remove_from_view',
  ADD_SNACKBAR: 'add_snackbar',
  SHIFT_SNACKBAR: 'shift_snackbar',
  UPDATE_POSITION: 'update_position',
  UPDATE_COLLAPSED: 'update_collapsed',
  UPDATE_TAB: 'update_tab'
}

export default ActionTypes;
