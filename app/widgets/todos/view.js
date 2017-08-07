require('babel-polyfill');
import Inferno from 'inferno';
import InfernoServer from 'inferno-server';
import windowAvailable from '../../utils/windowAvailable';

const TodoDetails = ({ todo, actions }) => {
    return (
        <li>
            <button onClick={() => actions.toggleTodo(todo.id)}>Toggle</button>
            <button onClick={() => actions.removeTodo(todo.id)}>Delete</button>
            <span>Id: </span>
            <span>{todo.id} </span>
            <a href="www.google.com">{todo.content}</a>
            <span> Completed:</span>
            <span>{todo.completed.toString()}</span>
        </li>
    );
};

const TodoList = ({ todos, actions }) => {
    return (
        <div>
            <ul>
                {
                    todos.map(todo => <TodoDetails todo={todo} actions={actions} />)
                }
            </ul>
        </div>
    );
};

const AddTodo = ({ editContent, actions }) => {
    return (
        <div>
            <input type="text" value={editContent} placeholder="Enter your todo here" onChange={(event) => actions.editContent(event.target.value)} />
            <button onClick={() => actions.addTodo()}>Add</button>
        </div>
    );
};

const TodoWidget = ({ actions, todoData, renderJson }) => {
    return (<div initialState={JSON.stringify(todoData)}>
        <TodoList actions={actions} todos={todoData.todos} />
        <AddTodo actions={actions} editContent={todoData.editContent} />
    </div>);
}

export const renderServer = (todoData, todoActions) => {
    return InfernoServer.renderToString(<TodoWidget actions={todoData.actions} todoData={todoData} renderJson={true} />);
}

export const render = (bindingSelector, todoData, todoActions) => {
    Inferno.render(<TodoWidget actions={todoActions} todoData={todoData} />,
        document.getElementById(bindingSelector)
    );
};

export const getInitialState = (bindingSelector) => {
    if (!windowAvailable) {
        return null;
    }

    const appContainer = document.getElementById(bindingSelector);

    if (appContainer.childNodes.length > 0 && appContainer.firstChild.getAttribute) {
        return appContainer.firstChild.getAttribute("initialState");
    }

    return null;
}