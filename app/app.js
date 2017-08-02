
import {todoStore} from './redux.js'
import {render} from './index.js';

todoStore.subscribe(() => {
    render(todoStore.getState());
});

render(todoStore.getState());