import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Settings } from '@components/pages/posts/post/header/settings/Settings';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Settings component', () => {
    const user = userEvent.setup();
    const mockReloadPosts = jest.fn();

    it('open menu when click on button', async () => {
        renderWithDefaultData(<Settings postId={1} type="OWN" reloadPosts={mockReloadPosts} />);

        const button = screen.getByLabelText('Show post settings');
        await user.click(button);

        const menu = await screen.findByLabelText('Settings');

        expect(menu).toBeInTheDocument();
    });
});
