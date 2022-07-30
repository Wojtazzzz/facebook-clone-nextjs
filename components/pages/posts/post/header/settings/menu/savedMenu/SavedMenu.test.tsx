import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { SavedMenu } from '@components/pages/posts/post/header/settings/menu/savedMenu/SavedMenu';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mock } from '@libs/nock';

describe('SavedMenu component', () => {
    it('show unsave option', () => {
        const mockCloseMenu = jest.fn();
        const mockReloadPosts = jest.fn();

        renderWithDefaultData(<SavedMenu postId={1} closeMenu={mockCloseMenu} reloadPosts={mockReloadPosts} />);

        const unsaveOption = screen.getByLabelText('Unsave');

        expect(unsaveOption).toBeInTheDocument();
    });

    it('execute closeMenu and reloadPosts callbacks when click on unsave option', async () => {
        const mockCloseMenu = jest.fn();
        const mockReloadPosts = jest.fn();
        const user = userEvent.setup();

        mock('/api/saved/posts/1', 204, {}, 'delete');

        renderWithDefaultData(<SavedMenu postId={1} closeMenu={mockCloseMenu} reloadPosts={mockReloadPosts} />);

        const unsaveOption = screen.getByLabelText('Unsave');

        await user.click(unsaveOption);

        await waitFor(() => {
            expect(mockCloseMenu).toHaveBeenCalledTimes(1);
        });

        await waitFor(() => {
            expect(mockReloadPosts).toHaveBeenCalledTimes(1);
        });
    });
});
