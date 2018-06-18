import ActionTypes from '../actions';

export default function(state, action){
  switch (action.type) {
    case ActionTypes.RETRIEVE_VERSION:
      if(action.payload.data){
        return action.payload.data.version
      }
      return "Error Retrieving Version";
    default:
      return state;
  }
}
