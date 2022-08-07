import { Nav } from './Nav';

interface HeaderProps {
    title: string;
}

export const Header = ({ title }: HeaderProps) => {
    return (
        <header className="w-full flex justify-between items-center sticky top-0 left-0 z-20 bg-dark-300 p-3">
            <span className="text-3xl text-light-100 font-bold capitalize">{title}</span>
            <Nav />
        </header>
    );
};
