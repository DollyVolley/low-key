// @ts-nocheck
import mitt from 'mitt';

export interface EventBus<T> {
  trigger: <K extends keyof T>(eventName: K, payload: T[K]) => void;
  subscribe: <K extends keyof T>(eventName: K, callbackFunc: (payload: T[K]) => void) => void;
  unsubscribe: <K extends keyof T>(eventName: K, callbackFunc: (payload: T[K]) => void) => void;
}

export function makeEventBus<T>(): EventBus<T> {
  const emitter = mitt();

  return Object.freeze({
    trigger(eventName, payload) {
      if (typeof eventName === 'string') {
        emitter.emit(eventName, payload);
      }
    },
    subscribe(eventName, callbackFunc) {
      if (typeof eventName === 'string') {
        emitter.on(eventName, callbackFunc);
      } 
    },
    unsubscribe(eventName, callbackFunc) {
      if (typeof eventName === 'string') {
        emitter.off(eventName, callbackFunc);
      }
    },
  });
}
