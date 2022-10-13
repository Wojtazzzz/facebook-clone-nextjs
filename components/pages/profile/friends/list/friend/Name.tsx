import Link from 'next/link';

interface NameProps {
    id: number;
    name: string;
}

export const Name = ({ id, name }: NameProps) => {
    return (
        <Link href={`/profile/${id}`}>
            <a className="text-sm md:text-base text-light-50 font-medium hover:underline">
                <h3>{name}</h3>
            </a>
        </Link>
    );
};
