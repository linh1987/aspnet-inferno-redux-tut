import { widget as todo } from './todos/index';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux';

let widgetRegistry = [];

widgetRegistry.push(todo);

const buildReducers = (registry) => {
    let reducers = {};

    for (let i = 0; i < widgetRegistry.length; i++) {
        reducers[widgetRegistry[i].id] = widgetRegistry[i].reducer;
    }

    return reducers;
}

const findWidgets = (doc, registry) => {
    let availableWidgets = [];

    for (let i = 0; i < registry.length; i++) {
        const widget = registry[i];
        if (doc('#' + widget.id).length > 0) {
            availableWidgets.push(widget);
        }
    }

    return availableWidgets;
}

const renderWidgets = (doc, widgets, store) => {
    for (let i = 0; i < widgets.length; i++) {
        const widget = widgets[i];
        doc('#' + widget.id).append(widget.renderServer(store));
    }

    return doc.html();
}

export let initWidgetManager = (renderToDOM) => {
    const sagaMiddleware = createSagaMiddleware();

    let store = createStore(combineReducers(buildReducers(widgetRegistry)), applyMiddleware(sagaMiddleware));

    for (let i = 0; i < widgetRegistry.length; i++) {
        sagaMiddleware.run(widgetRegistry[i].saga);
    }

    if (renderToDOM) {
        store.subscribe(() => {
            for (let i = 0; i < widgetRegistry.length; i++) {
                widgetRegistry[i].render(store);
            }
        })

        for (let i = 0; i < widgetRegistry.length; i++) {
            widgetRegistry[i].init(store);
        }
    }

    const isWidgetsReady = (widgets) => {
        return widgets.every(m => m.ready(store));
    }

    return {
        renderServer: (callback, html) => {
            let availableWidgets = findWidgets(html, widgetRegistry);

            for (let i = 0; i < availableWidgets.length; i++) {
                widgetRegistry[i].init(store);
            }

            if (isWidgetsReady(availableWidgets)) {
                callback(renderWidgets(html, availableWidgets, store));
            }

            store.subscribe(() => {
                if (isWidgetsReady(availableWidgets)) {
                    callback(renderWidgets(html, availableWidgets, store));
                }
            })
        }
    }
};