import ActionTypes from '../actions';
import { all } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';
import importChildren from './importChildren';

export default function*  rootSaga() {
  yield all([
    watchImportChildren()
  ])
};

export function* watchImportChildren() {
  yield takeEvery(ActionTypes.IMPORT_CHILDREN, importChildren);
};
