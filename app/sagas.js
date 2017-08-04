import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as services from './services';
import * as actions from './actions'; 
import * as actionCreators from './action-creators';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchTodos(action) {
   try {
      const todos = yield call(services.getTodos);
      yield put(actionCreators.createLoadTodoSuccessfulAction(todos));
   } catch (e) {
       console.log(e);
      yield put(actionCreators.createLoadTodoErrorAction());
   }
}


function* todoSaga() {
  yield takeLatest(actions.LOAD_TODO, fetchTodos);
}

export default todoSaga;