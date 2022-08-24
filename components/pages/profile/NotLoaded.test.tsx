import { mock } from '@libs/nock';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { NotLoaded } from '@components/pages/profile/NotLoaded';
import RootUserJson from '@mocks/user/root.json';
import { screen } from '@testing-library/react';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('NotLoaded component', () => {
    beforeEach(() => {
        useRouter.mockReturnValue({ push: jest.fn() });

        mock({
            path: '/api/user',
            data: RootUserJson,
        });
    });

    it('render "Waiting..." on button when user is fetching', () => {
        renderWithDefaultData(<NotLoaded />);

        const button = screen.getByText('Waiting...');

        expect(button).toBeInTheDocument();
    });

    it('render "Go to profile page" when user fetched', async () => {
        renderWithDefaultData(<NotLoaded />);

        const button = await screen.findByText('Go to profile page');

        expect(button).toBeInTheDocument();
    });

    it('render main headers', () => {
        renderWithDefaultData(<NotLoaded />);

        const title = screen.getByText('Ease down!');
        const description = screen.getByText('You are too fast for our servers, wait for network requests ;)');

        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
    });
});
