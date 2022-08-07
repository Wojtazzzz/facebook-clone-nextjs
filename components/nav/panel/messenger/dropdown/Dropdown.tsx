import { memo } from 'react';
import { useAppDispatch } from '@hooks/redux';
import { useKey } from '@hooks/useKey';
import { useOutsideClick } from '@hooks/useOutsideClick';

import { Header } from '@components/nav/panel/messenger/dropdown/Header';
import { List } from '@components/nav/panel/messenger/dropdown/list/List';

import { toggleActive } from '@redux/slices/MessengerSlice';

export const Dropdown = memo(() => {
    const dispatch = useAppDispatch();

    const handleClose = () => dispatch(toggleActive(false));

    useKey('Escape', handleClose);
    const ref = useOutsideClick(handleClose);

    return (
        <div
            ref={ref}
            data-testid="messenger-dropdown"
            className="min-w-[300px] md:min-w-[360px] flex flex-col gap-4 bg-dark-200 absolute top-full -right-24 z-20 shadow-md rounded-md p-3"
        >
            <Header title="Messenger" />
            <List />
        </div>
    );
});

Dropdown.displayName = 'Dropdown';
