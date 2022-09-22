interface HeaderProps {
    title: string;
}

export const Header = ({ title }: HeaderProps) => {
    return <header className="text-xl text-light-200 font-bold mb-3">{title}</header>;
};
