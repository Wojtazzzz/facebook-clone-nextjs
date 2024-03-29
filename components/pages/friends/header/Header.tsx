import { Nav } from './nav/Nav';

interface HeaderProps {
    title: string;
}

export const Header = ({ title }: HeaderProps) => {
    return (
        <header className="w-full flex justify-between items-center sticky top-0 left-0 z-20 bg-dark-300 p-3">
            <h1
                id="friendsList-header"
                data-testid="friendsList-header"
                className="text-xl md:text-2xl lg:text-3xl text-light-100 font-bold capitalize"
            >
                {title}
            </h1>

            <Nav />
        </header>
    );
};
