import { Avatar } from '@components/inc/Avatar';

interface SingleItemProps {
    ariaLabel: string;
    title: string;
    description: string;
    image: string;
    isActive?: boolean;
    callback: () => void;
}

export const SingleItem = ({ ariaLabel, title, description, image, isActive = true, callback }: SingleItemProps) => {
    return (
        <button
            aria-label={ariaLabel}
            className="w-full h-[72px] flex gap-3 hover:bg-dark-100 transition-colors rounded-lg cursor-pointer p-2"
            onClick={callback}
        >
            <Avatar src={image} size={56} alt="" />

            <div className={`flex flex-col text-left ${isActive ? '' : 'opacity-50'}`}>
                <span className="text-light-200">{title}</span>
                <span className="text-sm text-light-100">{description}</span>
            </div>
        </button>
    );
};
