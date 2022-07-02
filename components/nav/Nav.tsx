import { Logo } from '@components/nav/Logo';
import { SearchUser } from '@components/nav/SearchUser';
import { Navbar } from '@components/nav/navbar/Navbar';
import { Panel } from '@components/nav/panel/Panel';
import { Navbar as MobileNavbar } from '@components/nav/mobile/Navbar';

export const Nav = () => {
    return (
        <nav
            data-testid="nav"
            className="w-full h-14 flex justify-between md:justify-center fixed top-0 left-0 z-40 bg-dark-200 shadow-sm px-4"
        >
            <div className="w-1/3 flex items-center gap-2 my-1">
                <Logo />

                <div className="hidden md:block">
                    <SearchUser />
                </div>
            </div>

            <div className="w-1/3 hidden md:block">
                <Navbar />
            </div>

            <div className="w-1/3 my-1">
                <Panel />
            </div>

            <MobileNavbar />
        </nav>
    );
};
