import ActionTypes from '../actions';
import { all } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';
import importChildren from './importChildren';
import importSubs from './importSubs';
import updatePosition from './updatePosition';

export default function*  rootSaga() {
  yield all([
    watchImportChildren(),
    watchImportSubs(),
    watchUpdatePosition()
  ])
};

export function* watchImportChildren() {
  yield takeEvery(ActionTypes.IMPORT_CHILDREN, importChildren);
};

export function* watchImportSubs() {
  yield takeEvery(ActionTypes.IMPORT_SUBS, importSubs);
};

export function* watchUpdatePosition() {
  yield takeEvery(ActionTypes.UPDATE_POSITION, updatePosition);
};
