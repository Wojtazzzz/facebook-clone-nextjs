interface CloseOverlayProps {
    testid?: string;
    zIndex?: string | number;
    callback: () => void;
}

export const CloseOverlay = ({ testid, zIndex = '10', callback }: CloseOverlayProps) => {
    return (
        <div data-testid={testid} className={`w-full h-full fixed top-0 left-0 z-${zIndex}`} onClick={callback}></div>
    );
};
