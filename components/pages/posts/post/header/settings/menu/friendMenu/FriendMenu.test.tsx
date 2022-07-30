import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { FriendMenu } from '@components/pages/posts/post/header/settings/menu/friendMenu/FriendMenu';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mock } from '@libs/nock';

describe('FriendMenu component', () => {
    it('show hide and save options', () => {
        const mockCloseMenu = jest.fn();
        const mockReloadPosts = jest.fn();

        renderWithDefaultData(<FriendMenu postId={1} closeMenu={mockCloseMenu} reloadPosts={mockReloadPosts} />);

        const hideOption = screen.getByLabelText('Hide');
        const saveOption = screen.getByLabelText('Save');

        expect(hideOption).toBeInTheDocument();
        expect(saveOption).toBeInTheDocument();
    });

    it('execute closeMenu and reloadPosts callbacks when click on hide option', async () => {
        const mockCloseMenu = jest.fn();
        const mockReloadPosts = jest.fn();
        const user = userEvent.setup();

        mock('/api/hidden/posts', 201, {}, 'post');

        renderWithDefaultData(<FriendMenu postId={1} closeMenu={mockCloseMenu} reloadPosts={mockReloadPosts} />);

        const hideOption = screen.getByLabelText('Hide');

        await user.click(hideOption);

        await waitFor(() => {
            expect(mockCloseMenu).toHaveBeenCalledTimes(1);
        });

        await waitFor(() => {
            expect(mockReloadPosts).toHaveBeenCalledTimes(1);
        });
    });

    it('execute closeMenu and reloadPosts callbacks when click on save option', async () => {
        const mockCloseMenu = jest.fn();
        const mockReloadPosts = jest.fn();
        const user = userEvent.setup();

        mock('/api/saved/posts', 201, {}, 'post');

        renderWithDefaultData(<FriendMenu postId={1} closeMenu={mockCloseMenu} reloadPosts={mockReloadPosts} />);

        const saveOption = screen.getByLabelText('Save');

        await user.click(saveOption);

        await waitFor(() => {
            expect(mockCloseMenu).toHaveBeenCalledTimes(1);
        });

        await waitFor(() => {
            expect(mockReloadPosts).toHaveBeenCalledTimes(1);
        });
    });
});
