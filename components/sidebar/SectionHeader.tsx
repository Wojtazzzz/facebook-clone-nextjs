interface SectionHeaderProps {
    headingId: string;
    title: string;
}

export const SectionHeader = ({ headingId, title }: SectionHeaderProps) => {
    return (
        <header className="w-full flex justify-between items-center text-light-100 pb-1 mb-3">
            <h2 id={headingId} className="text-lg font-medium">
                {title}
            </h2>
        </header>
    );
};
