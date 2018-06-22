import ActionTypes from '../actions';
import { Map, fromJS } from 'immutable';

export default function(state = Map({}), action){
  switch (action.type) {
    case ActionTypes.RETRIEVE_SETTINGS:
      if(action.payload.data && typeof action.payload.data === "object"){
        return fromJS(action.payload.data)
      }
      return "Error Retrieving Settings";
    default:
      return state;
  }
}
