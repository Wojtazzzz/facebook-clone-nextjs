import Link from 'next/link';

interface HeaderProps {
    name: string | string[];
}

export const Header = ({ name }: HeaderProps) => {
    return (
        <div className="w-full flex justify-between items-center sticky top-0 left-0 z-20 bg-dark-300 p-3">
            <h5 className="text-3xl text-light-100 font-bold capitalize">{name}</h5>

            <nav className="flex items-center gap-3">
                <Link href="/friends">
                    <a className="text-xs text-light-100 hover:text-light-200 transition-colors">Friends</a>
                </Link>

                <Link href="/friends/suggests">
                    <a className="text-xs text-light-100 hover:text-light-200 transition-colors">Suggests</a>
                </Link>

                <Link href="/friends/invites">
                    <a className="text-xs text-light-100 hover:text-light-200 transition-colors">Invites</a>
                </Link>
            </nav>
        </div>
    );
};
