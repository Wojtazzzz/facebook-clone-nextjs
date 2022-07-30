import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { OwnMenu } from '@components/pages/posts/post/header/settings/menu/ownMenu/OwnMenu';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mock } from '@libs/nock';

describe('OwnMenu component', () => {
    it('show delete option', () => {
        const mockCloseMenu = jest.fn();
        const mockReloadPosts = jest.fn();

        renderWithDefaultData(<OwnMenu postId={1} closeMenu={mockCloseMenu} reloadPosts={mockReloadPosts} />);

        const deleteOption = screen.getByLabelText('Delete');

        expect(deleteOption).toBeInTheDocument();
    });

    it('execute closeMenu and reloadPosts callbacks when click on delete option', async () => {
        const mockCloseMenu = jest.fn();
        const mockReloadPosts = jest.fn();
        const user = userEvent.setup();

        mock('/api/posts/1', 204, {}, 'delete');

        renderWithDefaultData(<OwnMenu postId={1} closeMenu={mockCloseMenu} reloadPosts={mockReloadPosts} />);

        const deleteOption = screen.getByLabelText('Delete');

        await user.click(deleteOption);

        await waitFor(() => {
            expect(mockCloseMenu).toHaveBeenCalledTimes(1);
        });

        await waitFor(() => {
            expect(mockReloadPosts).toHaveBeenCalledTimes(1);
        });
    });
});
