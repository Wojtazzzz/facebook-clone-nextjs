import { screen } from '@testing-library/react';
import { Header } from '@components/pages/friends/header/Header';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';

describe('Friends Header component', () => {
    it('renders properly Friends title', () => {
        renderWithDefaultData(<Header title="Friends" />);

        const header = screen.getByTestId('friendsList-header');

        expect(header).toHaveTextContent('Friends');
    });

    it('renders properly Invites title', () => {
        renderWithDefaultData(<Header title="Invites" />);

        const header = screen.getByTestId('friendsList-header');

        expect(header).toHaveTextContent('Invites');
    });

    it('renders properly Suggests title', () => {
        renderWithDefaultData(<Header title="Suggests" />);

        const header = screen.getByTestId('friendsList-header');

        expect(header).toHaveTextContent('Suggests');
    });

    it('renders properly Pokes title', () => {
        renderWithDefaultData(<Header title="Pokes" />);

        const header = screen.getByTestId('friendsList-header');

        expect(header).toHaveTextContent('Pokes');
    });

    it('renders nav with properly links', () => {
        renderWithDefaultData(<Header title="Friends" />);

        const friendsLink = screen.getByText('Friends', { selector: 'a' });
        const suggestsLink = screen.getByText('Suggests', { selector: 'a' });
        const invitesLink = screen.getByText('Invites', { selector: 'a' });

        expect(friendsLink).toHaveAttribute('href', '/friends');
        expect(suggestsLink).toHaveAttribute('href', '/friends/suggests');
        expect(invitesLink).toHaveAttribute('href', '/friends/invites');
    });
});
