import { Link } from './Link';

export const Nav = () => {
    return (
        <ul role="menubar" data-testid="friends-nav" className="flex items-center gap-3">
            <Link path="/friends" name="Friends" />
            <Link path="/friends/suggests" name="Suggests" />
            <Link path="/friends/invites" name="Invites" />
        </ul>
    );
};
