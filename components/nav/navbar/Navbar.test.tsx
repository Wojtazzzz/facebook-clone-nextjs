import { mock } from '@libs/nock';
import RootUserJson from '@mocks/user/root.json';

import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Navbar } from '@components/nav/navbar/Navbar';
import { screen, waitFor } from '@testing-library/react';

describe('Navbar component', () => {
    beforeEach(() => {
        mock({
            path: '/api/user',
            data: RootUserJson,
        });

        const useRouter = jest.spyOn(require('next/router'), 'useRouter');
        useRouter.mockImplementation(() => ({
            route: '/',
            pathname: '/',
            query: '',
            asPath: '/',
            prefetch: () => ({
                catch: jest.fn(),
            }),
        }));
    });

    it('renders home, marketplace and user profile properly', async () => {
        renderWithDefaultData(<Navbar />);

        const homeLink = screen.getByLabelText('Home page');
        const marketplaceLink = screen.getByLabelText('Marketplace page');
        const profileLink = screen.getByLabelText('Profile page');

        expect(homeLink).toHaveAttribute('href', '/');
        expect(marketplaceLink).toHaveAttribute('href', '/marketplace');

        await waitFor(() => {
            expect(profileLink).toHaveAttribute('href', `/profile/${RootUserJson.id}`);
        });
    });

    it('renders user profile link with "/not-loaded" and change it to id when fetched logged user', async () => {
        renderWithDefaultData(<Navbar />);

        const profileLink = screen.getByLabelText('Profile page');
        expect(profileLink).toHaveAttribute('href', '/profile/not-loaded');

        await waitFor(() => {
            expect(profileLink).toHaveAttribute('href', `/profile/${RootUserJson.id}`);
        });
    });
});
