import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import RootUserJson from '@mocks/user/root.json';
import PokesFirstPageJson from '@mocks/friendsList/pokes/firstPage.json';
import { mock } from '@libs/nock';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GuestControls } from './GuestControls';

describe('Profile GuestPanel tests', () => {
    beforeEach(() => {
        mock({
            path: '/api/pokes?page=1',
            data: PokesFirstPageJson,
        });
    });

    it('render send message and poke buttons button which are enabled', async () => {
        renderWithDefaultData(<GuestControls user={RootUserJson} />);

        const sendMessageButton = await screen.findByLabelText('Send message');
        const pokeButton = await screen.findByLabelText('Poke');

        expect(sendMessageButton).toBeInTheDocument();
        expect(sendMessageButton).toBeEnabled();
        expect(pokeButton).toBeInTheDocument();
        expect(pokeButton).toBeEnabled();
    });

    it('poke button is enabled, disabled after click and enabled after request came', async () => {
        const user = userEvent.setup();

        mock({
            path: '/api/pokes',
            status: 201,
            method: 'post',
        });

        renderWithDefaultData(<GuestControls user={RootUserJson} />);

        const pokeButton = await screen.findByLabelText('Poke');
        expect(pokeButton).toBeEnabled();

        await user.click(pokeButton);

        await waitFor(() => {
            expect(pokeButton).toBeDisabled();
        });

        await waitFor(() => {
            expect(pokeButton).toHaveAttribute('disabled', '');
        });
    });
});
