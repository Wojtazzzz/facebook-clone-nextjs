import { usePokes } from '@hooks/usePokes';
import { Button } from '@components/inc/Button';
import type { IUser } from '@utils/types';
import { useChat } from '@hooks/useChat';

interface GuestControlsProps {
    user: IUser;
}

export const GuestControls = ({ user }: GuestControlsProps) => {
    const { openChat } = useChat();
    const { poke, isLoading } = usePokes();

    const handleOpenChat = () => openChat(user);
    const handlePoke = () => poke(user.id);

    return (
        <>
            <Button title="Send message" styles="w-[130px] xl:w-[155px]" callback={handleOpenChat} />
            <Button title="Poke" styles="w-[130px] xl:w-[155px]" isDisabled={isLoading} callback={handlePoke} />
        </>
    );
};
