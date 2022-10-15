interface OverlayProps {
    length: number;
}

export const Overlay = ({ length }: OverlayProps) => {
    if (length < 3) return null;

    return (
        <div className="group w-full h-full flex justify-center items-center absolute top-0 left-0 bg-gray-600/40">
            <span className="text-3xl text-white">+{length - 2}</span>
        </div>
    );
};
