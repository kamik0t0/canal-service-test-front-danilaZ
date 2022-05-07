/**
 * @function throttle - тормозящий декоратор - оптимизация чтобы не вызывать перерисовку на каждое нажатие клавиши при поиске.
 * @param {filtetCallback} function
 * @param {boolean} isCooldown
 * @param {null} savedArgs
 * @param {null} savedThis
 * @returns {function}
 */

export function throttle(func, isCooldown, savedArgs, savedThis) {
    const wrapper = (...args) => {
        if (isCooldown.current) {
            savedArgs.current = args;
            return;
        }
        func.apply(this, args);
        isCooldown.current = true;
        setTimeout(() => {
            isCooldown.current = false;
            if (savedArgs.current) {
                wrapper.apply(savedThis.current, savedArgs.current);
                savedArgs.current = savedThis.current = null;
            }
        }, 1000);
    };
    return wrapper;
}
