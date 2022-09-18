import { usePokes } from '@hooks/usePokes';
import { Button } from '@components/inc/Button';
import type { IUser } from '@utils/types';
import { useChat } from '@hooks/useChat';

interface GuestPanelProps {
    user: IUser;
}

export const GuestPanel = ({ user }: GuestPanelProps) => {
    const { openChat } = useChat();
    const { poke, isLoading } = usePokes();

    const handleOpenChat = () => openChat(user);
    const handlePoke = () => poke(user.id);

    return (
        <div className="w-full flex justify-end items-end gap-4 mt-5 md:mt-0 mr-6">
            <Button title="Send message" styles="w-[130px] xl:w-[155px]" callback={handleOpenChat} />
            <Button title="Poke" styles="w-[130px] xl:w-[155px]" isDisabled={isLoading} callback={handlePoke} />
        </div>
    );
};
