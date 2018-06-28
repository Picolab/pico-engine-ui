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

export function importChildren(DID, picoID, host) {
  return {
    type: ActionTypes.IMPORT_CHILDREN,
    payload: {
      DID,
      picoID,
      host
    }
  }
}

export function importSubs(DID, picoID, host) {
  return {
    type: ActionTypes.IMPORT_SUBS,
    payload: {
      DID,
      picoID,
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

const ActionTypes = {
  RETRIEVE_VERSION: 'retrieve_version',
  RETRIEVE_SETTINGS: 'retrieve_settings',
  RETRIEVE_PICO_NAME: 'retrieve_pico_name',
  IMPORT_CHILDREN: 'import_children',
  IMPORT_SUBS: 'import_subs',
  UPDATE_POSITION: 'update_position',
  REMOVE_FROM_VIEW: 'remove_from_view'
}

export default ActionTypes;
