import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { Menu } from './Menu';
import { mock } from '@libs/nock';
import RootUserJson from '@mocks/user/root.json';

describe('Menu component', () => {
    const mockCloseMenu = jest.fn();

    it('render FriendMenu when is_own is false type passed', async () => {
        const type = {
            is_own: false,
            is_saved: false,
            is_hidden: false,
        };

        renderWithDefaultData(<Menu postId={1} commenting={true} type={type} closeMenu={mockCloseMenu} />);

        const option = await screen.findByLabelText('Hide');

        expect(option).toBeInTheDocument();
    });

    it('render HiddenMenu when is_hidden is true type passed', async () => {
        const type = {
            is_own: false,
            is_saved: false,
            is_hidden: true,
        };

        renderWithDefaultData(<Menu postId={1} commenting={true} type={type} closeMenu={mockCloseMenu} />);

        const option = await screen.findByLabelText('Unhide');

        expect(option).toBeInTheDocument();
    });

    it('render SavedMenu when is_saved is true type passed', async () => {
        const type = {
            is_own: false,
            is_saved: true,
            is_hidden: false,
        };

        renderWithDefaultData(<Menu postId={1} commenting={true} type={type} closeMenu={mockCloseMenu} />);

        const option = await screen.findByLabelText('Unsave');

        expect(option).toBeInTheDocument();
    });

    it('render OwnMenu when is_own true type passed', async () => {
        const type = {
            is_own: true,
            is_saved: false,
            is_hidden: false,
        };

        mock({
            path: '/api/user',
            data: RootUserJson,
        });

        renderWithDefaultData(<Menu postId={1} commenting={true} type={type} closeMenu={mockCloseMenu} />);

        const option = await screen.findByLabelText('Delete');

        expect(option).toBeInTheDocument();
    });
});
