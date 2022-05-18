import { mock } from '@libs/nock';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { NotLoaded } from '@components/pages/profile/NotLoaded';
import RootUserJson from '@mocks/user/root.json';
import { screen } from '@testing-library/react';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('NotLoaded component', () => {
    beforeEach(() => {
        useRouter.mockReturnValue({ push: jest.fn() });
        mock('/api/user', 200, RootUserJson);
    });

    it('show "Waiting..." on button when user is fetching', () => {
        renderWithDefaultData(<NotLoaded />);

        const button = screen.getByText('Waiting...');

        expect(button).toBeInTheDocument();
    });

    it('show "Go to profile page" when user fetched', async () => {
        renderWithDefaultData(<NotLoaded />);

        const button = await screen.findByText('Go to profile page');

        expect(button).toBeInTheDocument();
    });

    it('show main headers', () => {
        renderWithDefaultData(<NotLoaded />);

        const title = screen.getByText('Ease down!');
        const description = screen.getByText('You are too fast for our servers, wait for network requests ;)');

        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
    });
});
