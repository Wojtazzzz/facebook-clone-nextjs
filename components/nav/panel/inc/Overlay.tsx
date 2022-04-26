interface OverlayProps {
    testid?: string;
    callback: () => void;
}

export const Overlay = ({ testid = '', callback }: OverlayProps) => {
    return <div data-testid={testid} className="w-full h-full fixed top-0 left-0" onClick={callback}></div>;
};
