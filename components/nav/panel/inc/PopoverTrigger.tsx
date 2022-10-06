import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PopoverTriggerProps {
    icon: IconDefinition;
    withAlert?: boolean;
}

export const PopoverTrigger = ({ icon, withAlert }: PopoverTriggerProps) => {
    return (
        <div className="relative">
            <div className="w-[40px] h-[40px] flex justify-center items-center bg-dark-100 hover:opacity-60 transition-all rounded-full p-0">
                <FontAwesomeIcon icon={icon} className="text-lg text-light-50" />
            </div>

            {withAlert && (
                <div
                    data-testid="alert"
                    className="w-[15px] h-[15px] flex justify-center items-center absolute -top-0 -right-0.5 rounded-full bg-dark-100 "
                >
                    <div className="w-[12px] h-[12px] rounded-full bg-red-600"></div>
                </div>
            )}
        </div>
    );
};
