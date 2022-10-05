import { Link } from './Link';

export const Nav = () => {
    return (
        <nav data-testid="friends-nav">
            <ul className="flex items-center gap-3">
                <Link path="/friends" name="Friends" />
                <Link path="/friends/suggests" name="Suggests" />
                <Link path="/friends/invites" name="Invites" />
            </ul>
        </nav>
    );
};
