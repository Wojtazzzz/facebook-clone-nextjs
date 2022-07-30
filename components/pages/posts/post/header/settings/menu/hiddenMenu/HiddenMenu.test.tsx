import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { HiddenMenu } from '@components/pages/posts/post/header/settings/menu/hiddenMenu/HiddenMenu';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mock } from '@libs/nock';

describe('HiddenMenu component', () => {
    it('show unhide option', () => {
        const mockCloseMenu = jest.fn();
        const mockReloadPosts = jest.fn();

        renderWithDefaultData(<HiddenMenu postId={1} closeMenu={mockCloseMenu} reloadPosts={mockReloadPosts} />);

        const unhideOption = screen.getByLabelText('Unhide');

        expect(unhideOption).toBeInTheDocument();
    });

    it('execute closeMenu and reloadPosts callbacks when click on unhide option', async () => {
        const mockCloseMenu = jest.fn();
        const mockReloadPosts = jest.fn();
        const user = userEvent.setup();

        mock('/api/hidden/posts/1', 204, {}, 'delete');

        renderWithDefaultData(<HiddenMenu postId={1} closeMenu={mockCloseMenu} reloadPosts={mockReloadPosts} />);

        const unhideOption = screen.getByLabelText('Unhide');

        await user.click(unhideOption);

        await waitFor(() => {
            expect(mockCloseMenu).toHaveBeenCalledTimes(1);
        });

        await waitFor(() => {
            expect(mockReloadPosts).toHaveBeenCalledTimes(1);
        });
    });
});
