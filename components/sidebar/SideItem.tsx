import * as React from 'react';

import Link from 'next/link';


interface SideItemProps {
    title: string | React.ReactFragment,
    link: string,
    icon: React.ReactFragment,
    target?: '_self' | '_blank' | '_parent' | '_top'
}

export const SideItem: React.FC<SideItemProps> = ({ title, link, icon, target = '_self' }) => {
    return (
        <Link href={link}>
            <a
                target={target}
                rel={target !== '_self' ? 'noreferrer noopener' : ''}
                className="h-12 flex items-center gap-2 hover:bg-dark-100 transition-colors rounded-md p-1"
            >
                <div className="w-12 flex justify-center items-center text-light-200 text-xl">{icon}</div>

                <div className="w-full text-light-200 font-medium">{title}</div>
            </a>
        </Link>
    );
}