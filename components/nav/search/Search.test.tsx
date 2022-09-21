import { mock } from '@libs/nock';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Search } from './Search';
import UserHitsFirstPageJson from '@mocks/search/usersFirstPage.json';
import UserHitsEmptyPageJson from '@mocks/search/empty.json';

describe('Search component', () => {
    const user = userEvent.setup();

    it('not render hits by default', () => {
        const mockOpen = jest.fn();
        const mockClose = jest.fn();

        renderWithDefaultData(<Search isActive={true} open={mockOpen} close={mockClose} />);

        const hits = screen.queryByTestId('search-hits');

        expect(hits).not.toBeInTheDocument();
    });

    it('render max 15 hits when query provided', async () => {
        const mockOpen = jest.fn();
        const mockClose = jest.fn();

        mock({
            path: '/api/users?search=Joh&page=1',
            data: UserHitsFirstPageJson,
        });

        renderWithDefaultData(<Search isActive={true} open={mockOpen} close={mockClose} />);

        const input = screen.getByLabelText('Search user');
        await user.type(input, 'Joh');

        const hits = await screen.findByTestId('search-hits');

        expect(hits).toBeInTheDocument();

        for (const user of UserHitsFirstPageJson.data) {
            expect(await screen.findByText(user.name));
        }
    });

    it('render NoResults when api return empty response', async () => {
        const mockOpen = jest.fn();
        const mockClose = jest.fn();

        mock({
            path: '/api/users?search=Joh&page=1',
            data: UserHitsEmptyPageJson,
        });

        renderWithDefaultData(<Search isActive={true} open={mockOpen} close={mockClose} />);

        const input = screen.getByLabelText('Search user');
        await user.type(input, 'Joh');

        const hits = await screen.findByTestId('search-hits');
        const noResults = await screen.findByText('No Results');

        expect(hits).toBeInTheDocument();
        expect(noResults).toBeInTheDocument();
    });

    it('render ApiError instead of button when api return error', async () => {
        const mockOpen = jest.fn();
        const mockClose = jest.fn();

        mock({
            path: '/api/users?search=Joh&page=1',
            status: 500,
        });

        renderWithDefaultData(<Search isActive={true} open={mockOpen} close={mockClose} />);

        const input = screen.getByLabelText('Search user');
        await user.type(input, 'Joh');

        const apiError = await screen.findByTestId('search-apiError');

        expect(apiError).toBeInTheDocument();
    });

    it('render SearchButton when no query text provided', async () => {
        const mockOpen = jest.fn();
        const mockClose = jest.fn();

        renderWithDefaultData(<Search isActive={true} open={mockOpen} close={mockClose} />);

        const searchButton = screen.queryByLabelText('Focus input');

        expect(searchButton).toBeInTheDocument();

        const input = screen.getByLabelText('Search user');
        await user.type(input, 'test');

        expect(searchButton).not.toBeInTheDocument();

        await user.clear(input);

        expect(screen.getByLabelText('Focus input')).toBeInTheDocument();
    });

    it('render ClearButton when query text provided', async () => {
        const mockOpen = jest.fn();
        const mockClose = jest.fn();

        renderWithDefaultData(<Search isActive={true} open={mockOpen} close={mockClose} />);

        expect(screen.queryByLabelText('Clear input')).not.toBeInTheDocument();

        const input = screen.getByLabelText('Search user');
        await user.type(input, 'test');

        expect(screen.getByLabelText('Clear input')).toBeInTheDocument();

        await user.clear(input);

        expect(screen.queryByLabelText('Clear input')).not.toBeInTheDocument();
    });

    it('clear input by click on ClearButton', async () => {
        const mockOpen = jest.fn();
        const mockClose = jest.fn();

        renderWithDefaultData(<Search isActive={true} open={mockOpen} close={mockClose} />);

        const input = screen.getByLabelText('Search user');
        await user.type(input, 'test');

        expect(input).toHaveValue('test');

        const clearButton = screen.getByLabelText('Clear input');
        await user.click(clearButton);

        expect(input).toHaveValue('');
    });
});
