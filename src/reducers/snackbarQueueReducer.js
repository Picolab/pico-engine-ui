import ActionTypes from '../actions';
import { List, fromJS } from 'immutable';
import uuidv4 from 'uuid/v4';

export function isValidSnackbarAction(btnAction) {
  if(btnAction && typeof btnAction === "object"){
    const { btnText, func, funcParams } = btnAction;
    if(btnText && typeof btnText === "string"){
      if(func && typeof func === "function") {
        if(funcParams && Array.isArray(funcParams)) {
          return true
        }
      }
    }
  }
  return false;
}

export default function(state = List([]), action) {
  switch (action.type) {
    case ActionTypes.ADD_SNACKBAR:
      const message = action.payload.message;
      const btnAction = action.payload.action;
      if(message && typeof message === "string") {
        let snackbar = {
          message,
          key: uuidv4()
        };
        //append optional action
        if(btnAction) {
          if(isValidSnackbarAction(btnAction)) {
            snackbar.action = btnAction;
          }else {
            console.error("Error! A snackbar action was provided, but was malformatted! Button action:", btnAction);
            return state;
          }
        }
        return state.push(fromJS(snackbar));
      }
      return state;
    case ActionTypes.SHIFT_SNACKBAR:
      if(state.count() > 0) {
        return state.shift(); //shift removes the first element
      }
      return state;
    default:
      return state;
  }
}
