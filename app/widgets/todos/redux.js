import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from './action-creators.js';
import * as actions from './actions.js';

function findMaxId(todos) {
    var allIds = todos.map(m => m.id);
    return Math.max(...allIds.concat([0]));
}

var defaultState = {
    todos: [],
    editContent: "",
    error: "",
    todoLoaded: false,
    loading: false
}

// reducer
function todoReducer(state = defaultState, action) {
    const newState = state;

    switch (action.type) {
        case actions.LOAD_TODO: 
            newState.loading = true;
            break;
        case actions.LOAD_TODO_SUCCESSFUL: 
            newState.todos = action.todos;
            newState.todoLoaded = true;
            newState.loading = false;
            break;
        case actions.LOAD_TODO_ERROR: 
            newState.loading = false;
            break;
        case actions.ADD_TODO:
            if (!newState.editContent)
                return state;
            newState.todos.push({
                id: findMaxId(newState.todos) + 1,
                content: state.editContent,
                completed: false
            });
            newState.editContent = "";
            break;
        case actions.REMOVE_TODO:
            newState.todos = newState.todos.filter(m => m.id !== action.id)
            break;
        case actions.TOGGLE_TODO:
            newState.todos.forEach(m => m.completed = m.id == action.id ? !m.completed : m.completed)
            break;
        case actions.EDIT_CONTENT:
            newState.editContent = action.content;
            break;
        default:
            return state;
    }

    return newState;
}

export let createTodoActions = (todoStore) => {
    return {
        addTodo: () => { todoStore.dispatch(actionCreators.createAddTodoAction()) },
        removeTodo: (id) => { todoStore.dispatch(actionCreators.createRemoveTodoAction(id)) },
        toggleTodo: (id) => { todoStore.dispatch(actionCreators.createToggleTodoAction(id)) },
        editContent: content => { todoStore.dispatch(actionCreators.createEditContentAction(content)) }
    };
}

export let reducer = todoReducer;