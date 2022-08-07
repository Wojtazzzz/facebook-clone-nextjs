import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { FriendMenu } from '@components/pages/posts/post/header/settings/menu/friendMenu/FriendMenu';
import { screen } from '@testing-library/react';

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
