import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface InfoProps {
    icon: IconDefinition;
    title: string;
    info?: string;
}

export const Info = ({ icon, title, info }: InfoProps) => {
    return (
        <article aria-label={info ? title : 'Marital status'} className="flex items-center">
            <div className="w-[24px] flex justify-center mr-3">
                <FontAwesomeIcon icon={icon} className="text-xl text-light-100" />
            </div>

            <span className="text-light-100">
                <span>{title}</span> {info && <span className="font-medium">{info}</span>}
            </span>
        </article>
    );
};
