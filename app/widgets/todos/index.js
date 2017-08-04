import {
    reducer,
    createTodoActions
} from './redux.js'

import {
    render,
    getInitialState
} from './view.js';

import * as actionCreators from './action-creators';

import { saga } from './sagas';

let renderWidget = (store) => (state) => {
    render(state, createTodoActions(store));
}

let initWidget = (store) => {
    let initialState = null;

    var initialStateString = getInitialState();

    if (initialStateString) {
        initialState = JSON.parse(initialStateString);
    }

    if (!initialState) {
        store.dispatch(actionCreators.createLoadTodoAction());
    } else {
        store.dispatch(actionCreators.createLoadTodoSuccessfulAction(initialState.todos));
    }
}

export { reducer, saga, renderWidget, initWidget }