import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Settings } from '@components/pages/posts/post/inc/settings/Settings';
import { screen } from '@testing-library/react';
import RootUserJson from '@mocks/user/root.json';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import { mock } from '@libs/nock';
import userEvent from '@testing-library/user-event';

describe('Settings component', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        mock('/api/user', 200, RootUserJson);
        mock('/api/posts?page=1', 200, PostsFirstPageJson);
    });

    it('open menu when click on button', async () => {
        renderWithDefaultData(<Settings authorId={1} postId={1} />);

        const button = screen.getByLabelText('Show post settings');
        await user.click(button);

        const menu = await screen.findByLabelText('Settings');

        expect(menu).toBeInTheDocument();
    });

    it('menu dissapear when click on close overlay', async () => {
        renderWithDefaultData(<Settings authorId={1} postId={1} />);

        const button = screen.getByLabelText('Show post settings');
        await user.click(button);

        const closeOverlay = await screen.findByTestId('settings-closeOverlay');
        await user.click(closeOverlay);

        const menu = screen.queryByLabelText('Settings');

        expect(menu).not.toBeInTheDocument();
    });
});
