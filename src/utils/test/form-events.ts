import { FormEvent } from 'react';

export function textChange(value: string): FormEvent<{}> {
    let event = {
        bubbles: false,
        cancelable: false,
        currentTarget: {
            addEventListener: () => {},
            dispatchEvent: () => true,
            removeEventListener: () => {}
        },
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: true,
        nativeEvent: new Event('change', ),
        timeStamp: 0,
        target: {
            addEventListener: () => {},
            dispatchEvent: () => false,
            removeEventListener: () => {},
        },
        type: 'change',
        isDefaultPrevented: () => false,
        isPropagationStopped: () => false,
        persist: () => false,
        preventDefault: () => false,
        stopPropagation: () => false
    };
    (<any>event.target).value = value;
    return event;
}