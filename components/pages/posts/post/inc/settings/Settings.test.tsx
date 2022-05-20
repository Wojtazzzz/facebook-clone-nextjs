import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Settings } from '@components/pages/posts/post/inc/settings/Settings';
import { screen } from '@testing-library/react';

describe('Settings component', () => {
    it('open menu when click click on button', async () => {
        renderWithDefaultData(<Settings authorId={1} postId={1} />);

        const button = screen.getByLabelText('Show post settings');
        button.click();

        const menu = await screen.findByLabelText('Settings');

        expect(menu).toBeInTheDocument();
    });

    it('menu dissapear when click on close overlay', async () => {
        renderWithDefaultData(<Settings authorId={1} postId={1} />);

        const button = screen.getByLabelText('Show post settings');
        button.click();

        const closeOverlay = await screen.findByTestId('settings-closeOverlay');
        closeOverlay.click();

        const menu = screen.queryByLabelText('Settings');

        expect(menu).not.toBeInTheDocument();
    });
});
