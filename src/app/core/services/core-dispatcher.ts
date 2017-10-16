import {} from '@angular/core';


export class CoreDispatcher {

    public static FILE_MATERIALS_UPLOADED;

    private listeners = {};

    on(event: string, callback: (data: any) => void) {

        if (!this.listeners.hasOwnProperty(event)) {
            this.listeners[event] = [];
        }
        let listeners = this.listeners[event];
        const len = listeners.push(callback);
        const index = len - 1;
        return () => {
            listeners.splice(index, 1);
        }
    }

    dispatch(event: string, data: any): void {
        if (!this.listeners.hasOwnProperty(event)) {
            this.listeners[event] = [];
        }

        let listeners = this.listeners[event];
        listeners.forEach((callback) => {
            callback.apply(null, data);
        });

    }
}
