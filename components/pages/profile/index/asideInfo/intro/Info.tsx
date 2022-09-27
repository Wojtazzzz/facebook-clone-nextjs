import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { clsx } from 'clsx';

interface InfoProps {
    icon: IconDefinition;
    title: string;
    label: string;
    info?: string;
}

export const Info = ({ icon, label, title, info }: InfoProps) => {
    return (
        <li aria-label={label} className="flex items-center">
            <div className="w-[24px] flex justify-center mr-3">
                <FontAwesomeIcon icon={icon} className="text-xl text-light-100" />
            </div>

            <span className="text-light-100">
                <span className={clsx(!info && 'font-medium')}>{title}</span>{' '}
                {info && <span className="font-medium">{info}</span>}
            </span>
        </li>
    );
};
