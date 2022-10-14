interface HeaderProps {
    postId: number;
}
export const Header = ({ postId }: HeaderProps) => {
    return (
        <h2 id={`post-${postId}-comments-header`} className="absolute -top-[9999px] -left-[9999px]">
            Comments
        </h2>
    );
};
