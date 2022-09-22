import { DesktopSearch } from './DesktopSearch';
import { MobileSearch } from './mobileSearch/MobileSearch';

export const Search = () => {
    return (
        <>
            <MobileSearch />
            <DesktopSearch />
        </>
    );
};
