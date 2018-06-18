import axios from 'axios';
import { getEngineLoc } from '../config.js';

export function retrieveVersion(){
  let promise = axios.get(`${getEngineLoc()}/api/engine-version`)
  return {
    type: ActionTypes.RETRIEVE_VERSION,
    payload: promise
  }
}

const ActionTypes = {
  RETRIEVE_VERSION: 'retrieve_version'
}

export default ActionTypes;
