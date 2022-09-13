import clsx from 'clsx';
import Image from 'next/image';

interface EmptyListProps {
    title: string;
    size?: 'sm' | 'base' | 'lg';
    styles?: string;
}

export const EmptyList = ({ title, size = 'base', styles = '' }: EmptyListProps) => {
    return (
        <div data-testid="empty-list" className={`w-full flex flex-col justify-center items-center gap-3 ${styles}`}>
            <Image
                width={clsx(size === 'sm' && '90', size === 'base' && '120', size === 'lg' && '150')}
                height={clsx(size === 'sm' && '90', size === 'base' && '120', size === 'lg' && '150')}
                src="/img/empty_list.svg"
                alt="List is empty"
            />

            <span
                className={clsx(
                    'text-light-100 text-center font-medium',
                    size === 'sm' && 'text-sm',
                    size === 'base' && 'text-lg',
                    size === 'lg' && 'text-2xl'
                )}
            >
                {title}
            </span>
        </div>
    );
};
