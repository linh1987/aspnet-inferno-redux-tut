require('babel-polyfill');
import Inferno from 'inferno';
import InfernoServer from 'inferno-server';

var TodoDetails = ({ todo, actions }) => {
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

var TodoList = ({ todos, actions }) => {
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

var AddTodo = ({ editContent, actions }) => {
    return (
        <div>
            <input type="text" value={editContent} placeholder="Enter your todo here" onChange={(event) => actions.editContent(event.target.value)} />
            <button onClick={() => actions.addTodo()}>Add</button>
        </div>
    );
};

var TodoWidget = ({ actions, editContent, todos }) => {
    return (<div>
        <TodoList actions={actions} todos={todos} />
        <AddTodo actions={actions} editContent={editContent} />
    </div>);
}

export var renderServer = (todoData) => {
    return InfernoServer.renderToString(<TodoWidget actions={todoData.actions} editContent={todoData.editContent} todos={todoData.todos} />);
}

export var render = (todoData) => {
    Inferno.render(<TodoWidget actions={todoData.actions} editContent={todoData.editContent} todos={todoData.todos} />,
        document.getElementById('app')
    );
};
