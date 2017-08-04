import * as todo from './todos/index';
import { combineReducers } from 'redux';

export let reducers = combineReducers({
    todo: todo.reducer
});
export let sagas = [todo.saga];
export let createWidgetsFunction = (store) => {
    return {
        renderFunctions: [
            () => todo.renderWidget(store)(store.getState().todo)
        ],
        initFunctions: [
            () => todo.initWidget(store)
        ]
    }
};