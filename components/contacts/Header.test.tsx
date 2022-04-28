import { screen } from '@testing-library/react';
import { Header } from '@components/contacts/Header';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';

describe('Contacts Header component', () => {
    it('renders contacts header', () => {
        renderWithDefaultData(<Header />);

        const title = screen.getByText('Contacts');

        expect(title).toBeInTheDocument();
    });

    it('renders search engine', () => {
        renderWithDefaultData(<Header />);

        const searchEngine = screen.getByLabelText('Search friend to text');

        expect(searchEngine).toBeInTheDocument();
    });
});
