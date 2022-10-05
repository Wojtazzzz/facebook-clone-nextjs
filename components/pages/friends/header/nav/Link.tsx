import NextLink from 'next/link';

interface LinkProps {
    path: string;
    name: string;
}

export const Link = ({ path, name }: LinkProps) => {
    return (
        <li>
            <NextLink href={path}>
                <a className="text-xs sm:text-sm text-light-100 hover:text-light-200 transition-colors">{name}</a>
            </NextLink>
        </li>
    );
};
