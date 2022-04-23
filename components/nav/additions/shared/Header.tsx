interface HeaderProps {
    testid?: string;
    title: string;
}
export const Header = ({ testid = '', title }: HeaderProps) => {
    return (
        <div data-testid={testid} className="w-full">
            <span className="text-2xl text-gray-300 font-bold">{title}</span>
        </div>
    );
};
