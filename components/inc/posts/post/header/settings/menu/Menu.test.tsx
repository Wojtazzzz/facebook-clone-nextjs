import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { Menu } from './Menu';
import { mock } from '@libs/nock';
import RootUserJson from '@mocks/user/root.json';

describe('Menu component', () => {
    const mockCloseMenu = jest.fn();

    it('render FriendMenu when "FRIEND" type passed', async () => {
        renderWithDefaultData(<Menu postId={1} commenting={true} type="FRIEND" closeMenu={mockCloseMenu} />);

        const option = await screen.findByLabelText('Hide');

        expect(option).toBeInTheDocument();
    });

    it('render HiddenMenu when "HIDDEN" type passed', async () => {
        renderWithDefaultData(<Menu postId={1} commenting={true} type="HIDDEN" closeMenu={mockCloseMenu} />);

        const option = await screen.findByLabelText('Unhide');

        expect(option).toBeInTheDocument();
    });

    it('render SavedMenu when "SAVED" type passed', async () => {
        renderWithDefaultData(<Menu postId={1} commenting={true} type="SAVED" closeMenu={mockCloseMenu} />);

        const option = await screen.findByLabelText('Unsave');

        expect(option).toBeInTheDocument();
    });

    it('render OwnMenu when "OWN" type passed', async () => {
        mock({
            path: '/api/user',
            data: RootUserJson,
        });

        renderWithDefaultData(<Menu postId={1} commenting={true} type="OWN" closeMenu={mockCloseMenu} />);

        const option = await screen.findByLabelText('Delete');

        expect(option).toBeInTheDocument();
    });
});
