import { useAuth } from '@hooks/useAuth';
import { Loader } from './Loader';
import { Avatar } from '@components/inc/Avatar';
import * as Dialog from '@radix-ui/react-dialog';

interface TriggerProps {
    open: () => void;
}

export const Trigger = ({ open }: TriggerProps) => {
    const { user } = useAuth();

    if (!user) return <Loader />;

    const { name, first_name, profile_image } = user;

    return (
        <Dialog.Trigger asChild>
            <button
                aria-label="Create a post"
                className="w-full flex justify-between items-center gap-3 bg-dark-200 rounded-lg p-3"
                onClick={open}
            >
                <div>
                    <Avatar src={profile_image} alt={name} styles="w-[45px] h-[45px] md:w-[58px] md:h-[58px]" />
                </div>

                <div className="w-full h-full bg-dark-100 text-sm md:text-base text-light-100 text-left hover:opacity-70 rounded-3xl cursor-pointer px-3 py-4">
                    What&apos;s on your mind, {first_name}?
                </div>
            </button>
        </Dialog.Trigger>
    );
};
