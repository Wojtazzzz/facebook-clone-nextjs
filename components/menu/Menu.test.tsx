import { Menu } from './Menu';
import { screen } from '@testing-library/react';
import RootUserJson from '@mocks/user/root.json';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { mock } from '@utils/nock';

describe('Menu component tests', () => {
    const mockClose = jest.fn();

    beforeEach(() => {
        mock({
            path: '/api/user',
            data: RootUserJson,
        });
    });

    it('loads logged user', async () => {
        renderWithDefaultData(<Menu isActive={true} close={mockClose} />);

        const loggedUser = await screen.findByText(RootUserJson.name);
        expect(loggedUser).toBeInTheDocument();
    });

    it('renders friends, pokes, github link properly', () => {
        renderWithDefaultData(<Menu isActive={true} close={mockClose} />);

        const friendsElement = screen.getByRole('link', { name: 'Friends' });
        const pokesElement = screen.getByRole('link', { name: 'Pokes' });
        const githubElement = screen.getByRole('link', { name: 'GitHub' });

        expect(friendsElement).toHaveAttribute('href', '/friends');
        expect(pokesElement).toHaveAttribute('href', '/friends/pokes');
        expect(githubElement).toHaveAttribute('href', 'https://github.com/CubeStorm/');
    });

    it('render footer', () => {
        const mockClose = jest.fn();

        renderWithDefaultData(<Menu isActive={true} close={mockClose} />);

        const footer = screen.getByTestId('app-footer');

        expect(footer).toBeInTheDocument();
    });
});
