import { mock } from '@utils/nock';
import RootUserJson from '@mocks/user/root.json';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { Mobile } from './Mobile';
import { mockUseRouter } from '@utils/tests/mockUseRouter';

describe('Mobile navigation component', () => {
    beforeEach(() => {
        mockUseRouter();

        mock({
            path: '/api/user',
            data: RootUserJson,
        });
    });

    it('render user profile link as disabled button and change it to correct user link', async () => {
        renderWithDefaultData(<Mobile />);

        const disabledButton = screen.getByLabelText('Wait for server response');
        expect(disabledButton).toHaveAttribute('disabled');

        const link = await screen.findByLabelText('Profile page', { selector: 'a' });

        expect(link).toHaveAttribute('href', `/profile/${RootUserJson.id}`);
    });

    it('render home, marketplace and user profile properly', async () => {
        renderWithDefaultData(<Mobile />);

        const homeLink = screen.getByLabelText('Home page');
        const marketplaceLink = screen.getByLabelText('Marketplace page');

        expect(homeLink).toHaveAttribute('href', '/');
        expect(marketplaceLink).toHaveAttribute('href', '/marketplace');

        const profileLink = await screen.findByLabelText('Profile page', { selector: 'a' });
        expect(profileLink).toHaveAttribute('href', `/profile/${RootUserJson.id}`);
    });
});
