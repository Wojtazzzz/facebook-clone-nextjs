import { useAppDispatch } from '@hooks/redux';
import { usePokes } from '@hooks/usePokes';

import { Button } from '@components/inc/Button';

import { clsx } from 'clsx';
import { showChat } from '@redux/slices/ChatSlice';

import type { UserType } from '@ctypes/features/UserType';

interface GuestPanelProps {
    user: UserType;
}

export const GuestPanel = ({ user }: GuestPanelProps) => {
    const dispatch = useAppDispatch();
    const { state, poke } = usePokes();

    const handleOpenChat = () => dispatch(showChat(user));
    const handlePoke = () => poke(user.id);

    return (
        <div className="w-full flex justify-end items-end gap-4 mb-6 mr-6">
            <Button title="Send message" styles="w-[130px] xl:w-[155px]" callback={handleOpenChat} />

            <Button
                title="Poke"
                styles={clsx('w-[130px] xl:w-[155px]')}
                isDisabled={state.status === 'LOADING'}
                callback={handlePoke}
            />
        </div>
    );
};
