import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Search } from './Search';

describe('Search component tests', () => {
    const user = userEvent.setup();

    const mockChangeQuery = () => jest.fn();
    const mockClearQuery = () => jest.fn();

    it("render search button instead of clear button when input doesn't have value", () => {
        const query = '';

        renderWithDefaultData(<Search query={query} changeQuery={mockChangeQuery} clearQuery={mockClearQuery} />);

        const input = screen.getByLabelText('Search friend');

        expect(input).toHaveValue('');

        const searchButton = screen.getByLabelText('Focus input');
        const clearButton = screen.queryByLabelText('Clear input');

        expect(searchButton).toBeInTheDocument();
        expect(clearButton).not.toBeInTheDocument();
    });

    it('render clear button instead of search button when input has value', () => {
        const query = 'test';

        renderWithDefaultData(<Search query={query} changeQuery={mockChangeQuery} clearQuery={mockClearQuery} />);

        const input = screen.getByLabelText('Search friend');

        expect(input).toHaveValue('test');

        const searchButton = screen.queryByLabelText('Focus input');
        const clearButton = screen.getByLabelText('Clear input');

        expect(searchButton).not.toBeInTheDocument();
        expect(clearButton).toBeInTheDocument();
    });

    it('focus input by click on search button', async () => {
        const query = '';

        renderWithDefaultData(<Search query={query} changeQuery={mockChangeQuery} clearQuery={mockClearQuery} />);

        const input = screen.getByLabelText('Search friend');
        const searchButton = screen.getByLabelText('Focus input');

        expect(input).not.toHaveFocus();

        await user.click(searchButton);

        expect(input).toHaveFocus();
    });
});
