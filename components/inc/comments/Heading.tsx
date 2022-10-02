interface HeadingProps {
    id: string;
}

export const Heading = ({ id }: HeadingProps) => {
    return (
        <h4 id={id} className="absolute -top-[9999px] -left-[9999px]">
            Comments
        </h4>
    );
};
