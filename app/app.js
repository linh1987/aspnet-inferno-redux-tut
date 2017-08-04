import "babel-polyfill";

import {
    createTodoStore,
    createTodoActions
} from './redux.js'
import {
    render,
    getInitialState
} from './index.js';
import * as actionCreators from './action-creators.js';

let initialState = null;

var initialStateString = getInitialState();

if (initialStateString) {
    initialState = JSON.parse(initialStateString);
}

export let todoStore = createTodoStore(initialState)
let todoActions = createTodoActions(todoStore);
var windowAvailable = false;
try {
    windowAvailable = !!(window || null);
} catch (e) {

}

if (windowAvailable) {
    todoStore.subscribe(() => {
        render(todoStore.getState(), todoActions);
    });
}


if (!initialState) {
    todoStore.dispatch(actionCreators.createLoadTodoAction());
} else {
    if (windowAvailable) {
        render(todoStore.getState(), todoActions);
    }
}