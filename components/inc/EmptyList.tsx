import Image from 'next/image';

interface EmptyListProps {
    title: string;
}

export const EmptyList = ({ title }: EmptyListProps) => {
    return (
        <div data-testid="empty-list" className="w-full flex flex-col justify-center items-center gap-5 mt-12">
            <Image width="150" height="150" src="/img/empty_list.svg" alt="List is empty" />

            <span className="text-2xl text-light-100 text-center font-bold">{title}</span>
        </div>
    );
};
