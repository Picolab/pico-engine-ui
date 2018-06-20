import ActionTypes from '../actions';
import { Map } from 'immutable';

export default function(state = Map({}), action){
  switch (action.type) {
    case ActionTypes.RETRIEVE_SETTINGS:
      if(action.payload.data){
        return action.payload.data
      }
      return "Error Retrieving Settings";
    default:
      return state;
  }
}
