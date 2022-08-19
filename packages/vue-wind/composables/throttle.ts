export function throttle(cb: Function, delay = 500) {    
    let throttle = false;

    return () => {
        if (throttle) return

        throttle = true;
        
        cb()

        setTimeout(() => (throttle = false), delay);
    };
};