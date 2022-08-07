interface HeaderProps {
    title: string;
}
export const Header = ({ title }: HeaderProps) => {
    return (
        <header className="w-full">
            <span className="text-2xl text-gray-300 font-bold">{title}</span>
        </header>
    );
};
