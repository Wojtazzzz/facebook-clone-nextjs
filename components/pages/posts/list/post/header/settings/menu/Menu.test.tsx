import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { Menu } from './Menu';

describe('Menu component', () => {
    const mockCloseMenu = jest.fn();

    it('render FriendMenu when "FRIEND" type passed', async () => {
        renderWithDefaultData(<Menu postId={1} type="FRIEND" closeMenu={mockCloseMenu} />);

        const option = await screen.findByLabelText('Hide');

        expect(option).toBeInTheDocument();
    });

    it('render HiddenMenu when "HIDDEN" type passed', async () => {
        renderWithDefaultData(<Menu postId={1} type="HIDDEN" closeMenu={mockCloseMenu} />);

        const option = await screen.findByLabelText('Unhide');

        expect(option).toBeInTheDocument();
    });

    it('render SavedMenu when "SAVED" type passed', async () => {
        renderWithDefaultData(<Menu postId={1} type="SAVED" closeMenu={mockCloseMenu} />);

        const option = await screen.findByLabelText('Unsave');

        expect(option).toBeInTheDocument();
    });

    it('render OwnMenu when "OWN" type passed', async () => {
        renderWithDefaultData(<Menu postId={1} type="OWN" closeMenu={mockCloseMenu} />);

        const option = await screen.findByLabelText('Delete');

        expect(option).toBeInTheDocument();
    });
});
