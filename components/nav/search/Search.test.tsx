import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Search } from '@components/nav/search/Search';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Search component tests', () => {
    const user = userEvent.setup();

    it('can write on input', async () => {
        renderWithDefaultData(<Search />);

        const input = screen.getByLabelText('User search input');
        await user.type(input, 'Hello World');

        expect(input).toHaveValue('Hello World');
    });

    it('when input is empty show search button and clear button is hidden', () => {
        renderWithDefaultData(<Search />);

        const searchButton = screen.getByLabelText('Focus input');
        const clearButton = screen.queryByLabelText('Clear input');

        expect(searchButton).toBeInTheDocument();
        expect(clearButton).not.toBeInTheDocument();
    });

    it('when input is not empty show clear button and search button is hidden', async () => {
        renderWithDefaultData(<Search />);

        const input = screen.getByLabelText('User search input');
        await user.type(input, 'a');

        const searchButton = screen.queryByLabelText('Focus input');
        const clearButton = screen.getByLabelText('Clear input');

        expect(searchButton).not.toBeInTheDocument();
        expect(clearButton).toBeInTheDocument();
    });

    it('focus input when click on search button', async () => {
        renderWithDefaultData(<Search />);

        const input = screen.getByLabelText('User search input');
        const searchButton = screen.getByLabelText('Focus input');

        await user.click(searchButton);

        expect(input).toHaveFocus();
    });

    it('clear input when click on clear button', async () => {
        renderWithDefaultData(<Search />);

        const input = screen.getByLabelText('User search input');
        await user.type(input, 'aaa');

        const clearButton = screen.getByLabelText('Clear input');
        await user.click(clearButton);

        expect(input).toHaveValue('');
    });
});
