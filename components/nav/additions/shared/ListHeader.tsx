interface ListHeaderProps {
    title: string;
}

export const ListHeader = ({ title }: ListHeaderProps) => {
    return (
        <div className="w-full">
            <span className="text-2xl text-gray-300 font-bold">{title}</span>
        </div>
    );
};
