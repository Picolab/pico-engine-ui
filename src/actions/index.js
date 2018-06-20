import axios from 'axios';
import { getEngineLoc } from '../config.js';
import { getSettings } from '../utils/picoSDK';

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

const ActionTypes = {
  RETRIEVE_VERSION: 'retrieve_version',
  RETRIEVE_SETTINGS: 'retrieve_settings'
}

export default ActionTypes;
