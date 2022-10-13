import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface NavItemProps {
    label: string;
    title: string;
    path: string;
    icon: IconDefinition;
}

export const NavItem = ({ label, title, path, icon }: NavItemProps) => {
    return (
        <Link href={path}>
            <a
                aria-label={label}
                title={label}
                className="w-full h-[50px] flex items-center gap-3 border-b-dark-200 border-b-2 px-4"
            >
                <div className="w-[26px]">
                    <FontAwesomeIcon className="text-xl text-light-100" icon={icon} />
                </div>

                <span className="text-lg text-light-100">{title}</span>
            </a>
        </Link>
    );
};
