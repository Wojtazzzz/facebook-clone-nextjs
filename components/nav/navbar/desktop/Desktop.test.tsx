import { mock } from '@libs/nock';
import RootUserJson from '@mocks/user/root.json';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Navbar } from '@components/nav/navbar/desktop/Navbar';
import { screen } from '@testing-library/react';
import { Desktop } from './Desktop';

describe('Desktop navigation component', () => {
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

    it('render user profile link as disabled button and change it to correct user link', async () => {
        renderWithDefaultData(<Desktop />);

        const disabledButton = screen.getByLabelText('Loading...', { selector: 'button' });
        expect(disabledButton).toHaveAttribute('disabled');

        const link = await screen.findByLabelText('Profile page', { selector: 'a' });

        expect(link).toHaveAttribute('href', `/profile/${RootUserJson.id}`);
    });

    it('render home, marketplace and user profile properly', async () => {
        renderWithDefaultData(<Desktop />);

        const homeLink = screen.getByLabelText('Home page');
        const marketplaceLink = screen.getByLabelText('Marketplace page');

        expect(homeLink).toHaveAttribute('href', '/');
        expect(marketplaceLink).toHaveAttribute('href', '/marketplace');

        const profileLink = await screen.findByLabelText('Profile page', { selector: 'a' });
        expect(profileLink).toHaveAttribute('href', `/profile/${RootUserJson.id}`);
    });
});