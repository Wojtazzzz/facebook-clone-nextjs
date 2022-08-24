export const mockResizeObserver = () =>
    ((global as any).ResizeObserver = class ResizeObserver {
        constructor(cb: any) {
            (this as any).cb = cb;
        }

        observe() {
            (this as any).cb([{ borderBoxSize: { inlineSize: 0, blockSize: 0 } }]);
        }

        unobserve() {}
        disconnect() {}
    });

(global as any).DOMRect = {
    fromRect: () => ({ top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0 }),
};
