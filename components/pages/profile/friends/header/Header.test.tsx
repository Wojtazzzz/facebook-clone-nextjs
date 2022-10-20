import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Header } from './Header';

describe('Header component tests', () => {
    const mockChangeQuery = jest.fn();
    const mockClearQuery = jest.fn();

    it('render properly title', () => {
        renderWithDefaultData(<Header query="" changeQuery={mockChangeQuery} clearQuery={mockClearQuery} />);

        const title = screen.getByText('Friends');

        expect(title).toBeInTheDocument();
    });

    it('render search with empty string as default value', () => {
        renderWithDefaultData(<Header query="" changeQuery={mockChangeQuery} clearQuery={mockClearQuery} />);

        const search = screen.getByRole('search');
        const searchbox = screen.getByLabelText('Search friend');

        expect(search).toBeInTheDocument();
        expect(searchbox).toHaveValue('');
    });
});
