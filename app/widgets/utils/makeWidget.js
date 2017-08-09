export const makeWidget = (bindingId, reducer, saga, render, renderServer, init, isReady) => {
    return {
        id: bindingId,
        reducer,
        saga,
        render: (store) => render(store)(store.getState()[bindingId]),
        renderServer: (store) => renderServer(store)(store.getState()[bindingId]),
        init: (store) => init(store),
        ready: (store) => isReady(store.getState()[bindingId]),
    }
};