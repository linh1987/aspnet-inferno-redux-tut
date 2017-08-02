import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from './action-creators.js';
import * as actions from './actions.js';

function findMaxId(todos) {
    var allIds = todos.map(m => m.id);
    return Math.max(...allIds.concat([0]));
}

// reducer
function todoReducer(state = {
    todos: [],
    editContent: "",
    actions: {
        addTodo: () => { todoStore.dispatch(actionCreators.createAddTodoAction()) },
        removeTodo: (id) => { todoStore.dispatch(actionCreators.createRemoveTodoAction(id)) },
        toggleTodo: (id) => { todoStore.dispatch(actionCreators.createToggleTodoAction(id)) },
        editContent: content => { todoStore.dispatch(actionCreators.createEditContentAction(content)) }
    }
}, action) {
    const newState = state;

    switch (action.type) {
        case actions.ADD_TODO:
            if (!newState.editContent)
                return state;
            newState.todos.push({
                id: findMaxId(newState.todos) + 1,
                content: state.editContent,
                completed: false
            });
            newState.editContent = "";
            return newState;
        case actions.REMOVE_TODO:
            newState.todos = newState.todos.filter(m => m.id !== action.id)
            return newState; 
        case actions.TOGGLE_TODO:
            newState.todos.forEach(m => m.completed = m.id == action.id ? !m.completed : m.completed)
            return newState;
        case actions.EDIT_CONTENT:
            newState.editContent = action.content;
        default:
            return state;
    }
}


// store
export let todoStore = createStore(todoReducer);
