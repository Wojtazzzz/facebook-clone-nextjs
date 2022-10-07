import { Close } from './Close';

interface HeaderProps {
    title: string;
    close: () => void;
}

export const Header = ({ title, close }: HeaderProps) => {
    return (
        <header className="w-full flex justify-between">
            <h3 id="nav-popover-header" className="text-2xl text-gray-300 font-bold">
                {title}
            </h3>

            <Close close={close} />
        </header>
    );
};
