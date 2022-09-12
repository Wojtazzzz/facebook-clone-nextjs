import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

interface NavTogglerProps {
    isActive: boolean;
    toggleActive: () => void;
}

export const NavToggler = ({ isActive, toggleActive }: NavTogglerProps) => {
    return (
        <button
            className="w-[50px] h-[50px] flex md:hidden justify-center items-center fixed bottom-3 right-3 z-40 bg-dark-100 rounded-full"
            onClick={toggleActive}
        >
            <FontAwesomeIcon className="text-xl text-light-100" icon={isActive ? faTimes : faBars} />
        </button>
    );
};
