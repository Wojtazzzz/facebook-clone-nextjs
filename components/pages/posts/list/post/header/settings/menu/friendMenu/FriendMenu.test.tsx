import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { FriendMenu } from './FriendMenu';

describe('FriendMenu component', () => {
    it('render hide and save options', () => {
        const mockCloseMenu = jest.fn();

        renderWithDefaultData(<FriendMenu postId={1} closeMenu={mockCloseMenu} />);

        const hideOption = screen.getByLabelText('Hide');
        const saveOption = screen.getByLabelText('Save');

        expect(hideOption).toBeInTheDocument();
        expect(saveOption).toBeInTheDocument();
    });
});
