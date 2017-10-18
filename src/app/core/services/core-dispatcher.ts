import { Injectable } from '@angular/core';

import { DispatcherInterface } from '../interfaces/dispatcher.interface';

@Injectable()
export class CoreDispatcher implements DispatcherInterface {

    private listeners = {};

    on(event: string, callback: (data: any) => void): () => void {

        if (!this.listeners.hasOwnProperty(event)) {
            this.listeners[event] = [];
        }
        const listeners = this.listeners[event];
        const len = listeners.push(callback);
        const index = len - 1;
        return () => {
            listeners.splice(index, 1);
        };
    }

    dispatch(event: string, data?: any): void {
        if (!this.listeners.hasOwnProperty(event)) {
            this.listeners[event] = [];
        }

        const listeners = this.listeners[event];
        listeners.forEach((callback) => {
            callback.apply(null, data);
        });
    }
}
