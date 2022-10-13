import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NextLink from 'next/link';

interface LinkProps {
    title: string;
    link: string;
    icon: IconDefinition;
    target?: '_self' | '_blank';
}

export const Link = ({ title, link, icon, target = '_self' }: LinkProps) => {
    return (
        <li role="menuitem">
            <NextLink href={link}>
                <a
                    target={target}
                    title={title}
                    rel={target !== '_self' ? 'noreferrer noopener' : ''}
                    className="h-12 flex items-center gap-2 hover:bg-dark-100 transition-colors rounded-md p-1"
                >
                    <div className="w-12 flex justify-center items-center text-light-200 text-xl">
                        <FontAwesomeIcon icon={icon} />
                    </div>

                    <div className="w-full text-light-200 font-medium">{title}</div>
                </a>
            </NextLink>
        </li>
    );
};
