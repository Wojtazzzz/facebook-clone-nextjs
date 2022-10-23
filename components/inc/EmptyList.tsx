import clsx from 'clsx';
import Image from 'next/future/image';

interface EmptyListProps {
    title: string;
    size?: 'sm' | 'base' | 'lg';
    styles?: string;
}

export const EmptyList = ({ title, size = 'base', styles = '' }: EmptyListProps) => {
    return (
        <div data-testid="empty-list" className={`w-full flex flex-col justify-center items-center gap-2 ${styles}`}>
            <Image
                width={clsx(size === 'sm' && '90', size === 'base' && '120', size === 'lg' && '150')}
                height={clsx(size === 'sm' && '90', size === 'base' && '120', size === 'lg' && '150')}
                sizes="(max-width: 768px) 90px, (max-width: 1560px) 120px, (max-width: 2560px) 150px, 200px"
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
