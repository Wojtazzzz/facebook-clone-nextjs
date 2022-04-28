import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { SearchUser } from '@components/nav/panel/messenger/SearchUser';

describe('Messenger SerchUser component', () => {
    it('render properly', () => {
        renderWithDefaultData(<SearchUser />);

        const searchbar = screen.getByLabelText('Search user');

        expect(searchbar).toBeInTheDocument();
    });
});
