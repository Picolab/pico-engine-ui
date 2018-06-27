import ActionTypes from '../actions';
import { all } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';
import importChildren from './importChildren';
import importSubs from './importSubs';
import removePicoFromView from './removePicoFromView';

export default function*  rootSaga() {
  yield all([
    watchImportChildren(),
    watchImportSubs(),
    watchRemoveFromView()
  ])
};

export function* watchImportChildren() {
  yield takeEvery(ActionTypes.IMPORT_CHILDREN, importChildren);
};

export function* watchImportSubs() {
  yield takeEvery(ActionTypes.IMPORT_SUBS, importSubs);
};

export function* watchRemoveFromView() {
  yield takeEvery(ActionTypes.REMOVE_FROM_VIEW, removePicoFromView)
}
