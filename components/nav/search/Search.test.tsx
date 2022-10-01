import { mock } from '@utils/nock';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Search } from './Search';
import UserHitsFirstPageJson from '@mocks/search/usersFirstPage.json';
import UserHitsEmptyPageJson from '@mocks/search/empty.json';

describe('Search component', () => {
    const user = userEvent.setup();

    it('not render hits by default', () => {
        renderWithDefaultData(<Search />);

        const hits = screen.queryByTestId('navSearch-results');

        expect(hits).not.toBeInTheDocument();
    });

    it('render max 15 hits when query provided', async () => {
        mock({
            path: '/api/users?search=Joh&page=1',
            data: UserHitsFirstPageJson,
        });

        renderWithDefaultData(<Search />);

        const input = screen.getByLabelText('Search user');
        await user.type(input, 'Joh');

        const hits = await screen.findByTestId('navSearch-results');

        expect(hits).toBeInTheDocument();

        for (const user of UserHitsFirstPageJson.data) {
            expect(await screen.findByText(user.name));
        }
    });

    it('render NoResults when api return empty response', async () => {
        mock({
            path: '/api/users?search=Joh&page=1',
            data: UserHitsEmptyPageJson,
        });

        renderWithDefaultData(<Search />);

        const input = screen.getByLabelText('Search user');
        await user.type(input, 'Joh');

        const hits = await screen.findByTestId('navSearch-results');
        const noResults = await screen.findByText('No Results');

        expect(hits).toBeInTheDocument();
        expect(noResults).toBeInTheDocument();
    });

    it('render ApiError instead of button when api return error', async () => {
        mock({
            path: '/api/users?search=Joh&page=1',
            status: 500,
        });

        renderWithDefaultData(<Search />);

        const input = screen.getByLabelText('Search user');
        await user.type(input, 'Joh');

        const apiError = await screen.findByText('Something went wrong, please try again later');

        expect(apiError).toBeInTheDocument();
    });

    it('render SearchButton when no query text provided', async () => {
        renderWithDefaultData(<Search />);

        const searchButton = screen.queryByLabelText('Focus input');

        expect(searchButton).toBeInTheDocument();

        const input = screen.getByLabelText('Search user');
        await user.type(input, 'test');

        expect(searchButton).not.toBeInTheDocument();

        await user.clear(input);

        expect(screen.getByLabelText('Focus input')).toBeInTheDocument();
    });

    it('render ClearButton when query text provided', async () => {
        renderWithDefaultData(<Search />);

        expect(screen.queryByLabelText('Clear input')).not.toBeInTheDocument();

        const input = screen.getByLabelText('Search user');
        await user.type(input, 'test');

        expect(screen.getByLabelText('Clear input')).toBeInTheDocument();

        await user.clear(input);

        expect(screen.queryByLabelText('Clear input')).not.toBeInTheDocument();
    });

    it('clear input by click on ClearButton', async () => {
        renderWithDefaultData(<Search />);

        const input = screen.getByLabelText('Search user');
        await user.type(input, 'test');

        expect(input).toHaveValue('test');

        const clearButton = screen.getByLabelText('Clear input');
        await user.click(clearButton);

        expect(input).toHaveValue('');
    });
});
