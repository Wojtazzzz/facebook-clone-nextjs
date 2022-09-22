import { Button } from '@components/nav/panel/inc/Button';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Overlay } from './Overlay';
import { useMobileSearch } from './useMobileSearch';

export const MobileSearch = () => {
    const { isActive, open, close } = useMobileSearch();

    return (
        <>
            <Button label="Search" icon={faSearch} styles="sm:hidden" callback={open} />

            {isActive && <Overlay close={close} />}
        </>
    );
};
