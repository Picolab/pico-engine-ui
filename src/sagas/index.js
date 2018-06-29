import ActionTypes from '../actions';
import { all } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';
import importChildren from './importChildren';
import importSubs from './importSubs';
import updatePosition from './updatePosition';
import updateCollapsed from './updateCollapsed';
import updateTab from './updateTab';
import removePicoFromView from './removePicoFromView';

export default function*  rootSaga() {
  yield all([
    watchImportChildren(),
    watchImportSubs(),
    watchUpdateCollapsed(),
    watchUpdateTab(),
    watchUpdatePosition(),
    watchRemoveFromView()
  ])
};

export function* watchImportChildren() {
  yield takeEvery(ActionTypes.IMPORT_CHILDREN, importChildren);
};

export function* watchImportSubs() {
  yield takeEvery(ActionTypes.IMPORT_SUBS, importSubs);
};

export function* watchUpdateCollapsed(){
  yield takeEvery(ActionTypes.UPDATE_COLLAPSED, updateCollapsed);
};

export function* watchUpdateTab(){
  yield takeEvery(ActionTypes.UPDATE_TAB, updateTab);
};

export function* watchUpdatePosition() {
  yield takeEvery(ActionTypes.UPDATE_POSITION, updatePosition);
};

export function* watchRemoveFromView() {
  yield takeEvery(ActionTypes.REMOVE_FROM_VIEW, removePicoFromView)
};
