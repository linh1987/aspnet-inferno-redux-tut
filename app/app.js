import "babel-polyfill";
import windowAvailable from './utils/windowAvailable';
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware  } from 'redux';
import { createWidgetsFunction, reducers, sagas } from './widgets/index';

const sagaMiddleware = createSagaMiddleware();

export let store = createStore(reducers, applyMiddleware(sagaMiddleware));

for (var i = 0; i < sagas.length; i++) {
    sagaMiddleware.run(sagas[i]);
}

var widgets = createWidgetsFunction(store)

store.subscribe(() => {
    for (var i = 0; i < widgets.renderFunctions.length; i++) {
        widgets.renderFunctions[i]();
    }
})

for (var i = 0; i < widgets.initFunctions.length; i++) {
    widgets.initFunctions[i]();
}