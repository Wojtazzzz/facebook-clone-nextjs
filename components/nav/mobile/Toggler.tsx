import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import { toggleActive } from '@redux/slices/NavSlice';


export const Toggler: React.FC = () => {
    const { isActive } = useAppSelector(store => store.nav);
    const dispatch = useAppDispatch();

    const handleToggleActive = () => dispatch(toggleActive(!isActive));

    return (
        <div
            className="w-[50px] h-[50px] flex md:hidden justify-center items-center fixed bottom-3 right-3 z-40 bg-dark-100 rounded-full"
            onClick={handleToggleActive}
        >
            <FontAwesomeIcon
                className="text-xl text-light-100"
                icon={isActive ? faTimes : faBars}
            />
        </div>
    );
}