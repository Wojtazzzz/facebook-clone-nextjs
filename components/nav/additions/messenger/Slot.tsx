import { useAppDispatch } from '@hooks/redux';

import { Avatar } from '@components/Avatar';

import { toggleActive as toggleActiveChat } from '@redux/slices/ChatSlice';
import { toggleActive as toggleActiveMessenger } from '@redux/slices/MessengerSlice';

import type { UserType } from '@ctypes/features/UserType';

interface SlotProps extends UserType {}

export const Slot = ({ id, name, first_name, profile_image, background_image }: SlotProps) => {
    const dispatch = useAppDispatch();

    const handleOpenChat = () => {
        dispatch(toggleActiveMessenger());
        dispatch(toggleActiveChat({ id, name, first_name, profile_image, background_image }));
    };

    return (
        <div
            className="w-full h-[72px] flex gap-3 hover:bg-dark-100 transition-colors rounded-lg cursor-pointer p-2"
            onClick={handleOpenChat}
        >
            <Avatar src={profile_image} size={56} alt={name} />

            <div className="flex flex-col">
                <span className="text-light-200">{name}</span>
                <span className="text-sm text-light-100">Click to open chat</span>
            </div>
        </div>
    );
};
