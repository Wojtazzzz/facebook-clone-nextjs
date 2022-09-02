import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { FriendOptions } from './FriendOptions';

describe('FriendOptions component', () => {
    it('render hide and save options', () => {
        const mockCloseMenu = jest.fn();

        renderWithDefaultData(<FriendOptions postId={1} closeMenu={mockCloseMenu} />);

        const hideOption = screen.getByLabelText('Hide');
        const saveOption = screen.getByLabelText('Save');

        expect(hideOption).toBeInTheDocument();
        expect(saveOption).toBeInTheDocument();
    });
});
