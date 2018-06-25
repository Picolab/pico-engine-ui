import ActionTypes from '../actions';
import { Map, fromJS } from 'immutable';

export default function(state = Map({}), action){
  switch (action.type) {
    case ActionTypes.RETRIEVE_PICO_NAME:
      console.log(action);
      if(action.payload.data && typeof action.payload.data === "string" && action.meta && action.meta.picoID){
        return state.setIn([action.meta.picoID, "name"], action.payload.data);
      }
      return state;
    default:
      return state;
  }
}
