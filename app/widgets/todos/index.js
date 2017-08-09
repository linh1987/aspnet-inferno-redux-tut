import {
    reducer,
    createTodoActions
} from './redux.js'

import {
    makeWidget
} from '../utils/makeWidget';

import {
    render,
    renderServer,
    getInitialState
} from './view.js';

import * as actionCreators from './action-creators';

import { saga } from './sagas';

const bindingId = "app";

let renderWidget = (store) => (state) => {
    render(bindingId, state, createTodoActions(store));
}

let renderServerWidget = (store) => (state) => {
    return renderServer(state, createTodoActions(store));
}

let initWidget = (store) => {
    let initialState = null;

    var initialStateString = getInitialState(bindingId);

    if (initialStateString) {
        initialState = JSON.parse(initialStateString);
    }

    if (!initialState) {
        store.dispatch(actionCreators.createLoadTodoAction());
    } else {
        store.dispatch(actionCreators.createLoadTodoSuccessfulAction(initialState.todos));
    }
}

let isWidgetInitialized = (state) => {
    return state.todoLoaded === true;
}

export const widget = makeWidget(bindingId, reducer, saga, renderWidget, renderServerWidget, initWidget, isWidgetInitialized);