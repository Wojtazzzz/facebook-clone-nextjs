import { useKey } from '@hooks/useKey';
import { useOutsideClick } from '@hooks/useOutsideClick';
import { SearchEngine } from '../searchEngine/SearchEngine';

interface OverlayProps {
    close: () => void;
}

export const Overlay = ({ close }: OverlayProps) => {
    useKey('Escape', close);
    const ref = useOutsideClick<HTMLDivElement>(close);

    return (
        <div ref={ref} className="w-[280px] h-screen flex fixed top-0 left-0 z-40 bg-dark-200 p-5">
            <SearchEngine />
        </div>
    );
};
