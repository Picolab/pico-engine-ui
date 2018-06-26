import axios from 'axios';
import { getEngineLoc } from '../config.js';
import { getSettings, getPicoName } from '../utils/picoSDK';

export function retrieveVersion(){
  const promise = axios.get(`${getEngineLoc()}/api/engine-version`)
  return {
    type: ActionTypes.RETRIEVE_VERSION,
    payload: promise
  }
}

export function retrieveSettings(DID, host) {
  const promise = getSettings(DID, host)
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

const ActionTypes = {
  RETRIEVE_VERSION: 'retrieve_version',
  RETRIEVE_SETTINGS: 'retrieve_settings',
  RETRIEVE_PICO_NAME: 'retrieve_pico_name',
  IMPORT_CHILDREN: 'import_children'
}

export default ActionTypes;
