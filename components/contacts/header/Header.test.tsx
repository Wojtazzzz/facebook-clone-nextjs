import { screen } from '@testing-library/react';
import { Header } from '@components/contacts/header/Header';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';

describe('Header component', () => {
    it('render title', () => {
        renderWithDefaultData(<Header />);

        const title = screen.getByText('Contacts');

        expect(title).toBeInTheDocument();
    });

    it('render search icon', () => {
        renderWithDefaultData(<Header />);

        const searchEngine = screen.getByLabelText('Search friend to text');

        expect(searchEngine).toBeInTheDocument();
    });
});
