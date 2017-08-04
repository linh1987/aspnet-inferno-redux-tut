import * as actions from './actions.js';

// action creators
export function createAddTodoAction() {
    return {
        type: actions.ADD_TODO,
    };
}

export function createToggleTodoAction(id) {
    return {
        type: actions.TOGGLE_TODO, 
        id
    }
}

export function createRemoveTodoAction(id) {
    return {
        type: actions.REMOVE_TODO,
        id
    }
}

export function createEditContentAction(content) {
    return {
        type: actions.EDIT_CONTENT,
        content
    }
}

export function createLoadTodoAction() {
    return {
        type: actions.LOAD_TODO
    };
}

export function createLoadTodoSuccessfulAction(todos) {
    return {
        type: actions.LOAD_TODO_SUCCESSFUL,
        todos
    };
}

export function createLoadTodoErrorAction(todos) {
    return {
        type: actions.LOAD_TODO_ERROR
    };
}