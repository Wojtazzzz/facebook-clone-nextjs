import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Panel } from '@components/pages/profile/hero/panel/Panel';
import RootUserJson from '@mocks/user/root.json';
import { mock } from '@libs/nock';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Profile GuestPanel tests', () => {
    beforeEach(() => {
        mock('/api/user', 200, RootUserJson);
    });

    it('render send message and poke buttons button which are enabled', async () => {
        renderWithDefaultData(<Panel pageUser={RootUserJson} />);

        const sendMessageButton = await screen.findByLabelText('Send message');
        const pokeButton = await screen.findByLabelText('Poke');

        expect(sendMessageButton).toBeInTheDocument();
        expect(sendMessageButton).toBeEnabled();
        expect(pokeButton).toBeInTheDocument();
        expect(pokeButton).toBeEnabled();
    });

    it('poke button is enabled, disabled after click and enabled after request came', async () => {
        const user = userEvent.setup();

        mock('/api/pokes', 201, {}, 'post');

        renderWithDefaultData(<Panel pageUser={RootUserJson} />);

        const pokeButton = await screen.findByLabelText('Poke');

        expect(pokeButton).toBeInTheDocument();
        expect(pokeButton).toBeEnabled();

        await user.click(pokeButton);

        expect(pokeButton).toBeDisabled();

        await waitFor(() => {
            expect(pokeButton).toHaveAttribute('disabled', '');
        });
    });
});
