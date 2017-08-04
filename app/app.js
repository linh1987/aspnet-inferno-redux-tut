
import { createTodoStore, createTodoActions } from './redux.js'
import { render, getInitialState } from './index.js';

let initialState = JSON.parse(getInitialState());
let todoStore = createTodoStore(initialState)
let todoActions = createTodoActions(todoStore);

todoStore.subscribe(() => {
    render(todoStore.getState(), todoActions);
});

render(todoStore.getState(), todoActions);