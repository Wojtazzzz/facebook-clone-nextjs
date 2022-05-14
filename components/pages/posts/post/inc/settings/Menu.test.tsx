import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Menu } from '@components/pages/posts/post/inc/settings/Menu';
import { screen } from '@testing-library/react';

describe('Menu component', () => {
    const mockCloseMenu = jest.fn();

    it('execute close settings function on click on close overlay', () => {
        renderWithDefaultData(<Menu postId={1} closeMenu={mockCloseMenu} />);

        const overlay = screen.getByTestId('settings-closeOverlay');
        overlay.click();

        expect(mockCloseMenu).toHaveBeenCalledTimes(1);
    });
});
