import { Logo } from '@components/nav/Logo';
import { Search } from '@components/nav/search/Search';
import { Navbar } from '@components/nav/navbar/desktop/Navbar';
import { Panel } from '@components/nav/panel/Panel';
import { useSearchActive } from './useSearchActive';

interface NavProps {
    toggleMenu: () => void;
}

export const Nav = ({ toggleMenu }: NavProps) => {
    const { isActive, open, close } = useSearchActive();

    return (
        <nav
            data-testid="nav"
            className="w-full h-14 flex justify-between lg:justify-center fixed top-0 left-0 z-40 bg-dark-200 shadow-sm px-2 md:px-2"
        >
            <div className="w-2/5 lg:w-1/3 flex items-center gap-2 my-1">
                <Logo />

                <Search isActive={isActive} open={open} close={close} />
            </div>

            <Navbar />
            <Panel isSearchActive={isActive} toggleMenu={toggleMenu} />
        </nav>
    );
};
