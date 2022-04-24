import { screen } from '@testing-library/react';
import { Header } from '@components/pages/friends/Header';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';

describe('Header component', () => {
    const headers = ['Friends', 'Suggests', 'Invites', 'Pokes'];

    it('renders truthy list name', async () => {
        headers.forEach((header) => {
            renderWithDefaultData(<Header name={header} />);

            const title = screen.getByText(header, { selector: 'h5' });

            expect(title).toBeInTheDocument();
        });
    });

    it('renders nav with links', () => {
        renderWithDefaultData(<Header name="Friends" />);

        const friendsLink = screen.getByText('Friends', { selector: 'a' });
        const suggestsLink = screen.getByText('Suggests', { selector: 'a' });
        const invitesLink = screen.getByText('Invites', { selector: 'a' });

        expect(friendsLink).toHaveAttribute('href', '/friends');
        expect(suggestsLink).toHaveAttribute('href', '/friends/suggests');
        expect(invitesLink).toHaveAttribute('href', '/friends/invites');
    });
});
