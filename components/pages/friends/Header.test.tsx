import { screen } from '@testing-library/react';
import { Header } from '@components/pages/friends/Header';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';

describe('Friends Header component', () => {
    it('renders properly Friends title', () => {
        renderWithDefaultData(<Header name="FRIENDS" />);

        const title = screen.getByText('Friends', { selector: 'h5' });

        expect(title).toBeInTheDocument();
    });

    it('renders properly Friends title when passed undefined', () => {
        renderWithDefaultData(<Header name={undefined} />);

        const title = screen.getByText('Friends', { selector: 'h5' });

        expect(title).toBeInTheDocument();
    });

    it('renders properly Invites title', () => {
        renderWithDefaultData(<Header name="INVITES" />);

        const title = screen.getByText('Invites', { selector: 'h5' });

        expect(title).toBeInTheDocument();
    });

    it('renders properly Suggests title', () => {
        renderWithDefaultData(<Header name="SUGGESTS" />);

        const title = screen.getByText('Suggests', { selector: 'h5' });

        expect(title).toBeInTheDocument();
    });

    it('renders properly Pokes title', () => {
        renderWithDefaultData(<Header name="POKES" />);

        const title = screen.getByText('Pokes', { selector: 'h5' });

        expect(title).toBeInTheDocument();
    });

    it('renders nav with links', () => {
        renderWithDefaultData(<Header name="FRIENDS" />);

        const friendsLink = screen.getByText('Friends', { selector: 'a' });
        const suggestsLink = screen.getByText('Suggests', { selector: 'a' });
        const invitesLink = screen.getByText('Invites', { selector: 'a' });

        expect(friendsLink).toHaveAttribute('href', '/friends');
        expect(suggestsLink).toHaveAttribute('href', '/friends/suggests');
        expect(invitesLink).toHaveAttribute('href', '/friends/invites');
    });
});
