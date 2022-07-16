import { useRouter } from 'next/router';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { clsx } from 'clsx';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface NavItemProps {
    name: string;
    path: string;
    icon: IconDefinition;
}

export const NavItem = ({ name, path, icon }: NavItemProps) => {
    const { asPath } = useRouter();

    const isActive = asPath === path;

    return (
        <Link href={path}>
            <a
                aria-label={`${name} page`}
                title={name}
                className="w-[112px] h-full flex flex-col justify-center items-center gap-2 relative"
            >
                <div
                    className={clsx(
                        'w-full h-full flex justify-center items-center rounded-lg my-1',
                        !isActive && 'hover:bg-dark-100'
                    )}
                >
                    <FontAwesomeIcon
                        icon={icon}
                        className={clsx('text-xl', isActive && 'text-primary', !isActive && 'text-light-100')}
                    />
                </div>

                {isActive && <div className="w-full h-[3px] absolute bottom-0 left-0 bg-primary"></div>}
            </a>
        </Link>
    );
};
