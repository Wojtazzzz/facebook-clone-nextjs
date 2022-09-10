import { Menu } from './Menu';
import { screen } from '@testing-library/react';
import RootUserJson from '@mocks/user/root.json';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { mock } from '@libs/nock';
import React from 'react';

describe('Menu component', () => {
    beforeEach(() => {
        mock({
            path: '/api/user',
            data: RootUserJson,
        });
    });

    it('loads logged user', async () => {
        renderWithDefaultData(<Menu />);

        const loggedUser = await screen.findByText(RootUserJson.name);
        expect(loggedUser).toBeInTheDocument();
    });

    it('renders friends, pokes, github link properly', () => {
        renderWithDefaultData(<Menu />);

        const friendsElement = screen.getByTitle('Friends');
        const pokesElement = screen.getByTitle('Pokes');
        const githubElement = screen.getByTitle('GitHub');

        expect(friendsElement).toBeInTheDocument();
        expect(pokesElement).toBeInTheDocument();
        expect(githubElement).toBeInTheDocument();

        expect(friendsElement).toHaveAttribute('href', '/friends');
        expect(pokesElement).toHaveAttribute('href', '/friends/pokes');
        expect(githubElement).toHaveAttribute('href', 'https://github.com/CubeStorm/');
    });
});
