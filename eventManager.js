class eventManager {
    listeners = {};

    on = (event, listener) => {
        let listenerPosition;
        if (typeof this.listeners[event] != 'undefined') {
            listenerPosition = this.listeners[event].push(listener) - 1
        } else {
            this.listeners[event] = [listener]
            listenerPosition = 0
        }
        return listenerPosition;
    };

    trigger = (event, params) => {
        for (const i in this.listeners[event]) {
            let listener = this.listeners[event][i]
            if (typeof listener == 'function') {
                listener(params)
            }
        }
        return;
    };
}
