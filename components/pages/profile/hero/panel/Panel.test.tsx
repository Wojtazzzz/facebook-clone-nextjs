import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Panel } from '@components/pages/profile/hero/panel/Panel';
import RootUserJson from '@mocks/user/root.json';
import { mock } from '@libs/nock';
import { screen } from '@testing-library/react';
import nock from 'nock';

describe('Profile Panel tests', () => {
    beforeEach(() => {
        mock({
            path: '/api/user',
            data: RootUserJson,
        });
    });

    it("render AuthPanel when profile is logged user's, GuestPanel not showed", async () => {
        renderWithDefaultData(<Panel pageUser={RootUserJson} />);

        const editButton = await screen.findByLabelText('Edit profile');
        const sendMessageButton = screen.queryByLabelText('Send message');
        const pokeButton = screen.queryByLabelText('Poke');

        expect(editButton).toBeInTheDocument();
        expect(sendMessageButton).not.toBeInTheDocument();
        expect(pokeButton).not.toBeInTheDocument();
    });

    it("render GuestPanel when profile is not logged user's, AuthPanel not showed", async () => {
        renderWithDefaultData(<Panel pageUser={RootUserJson} />);

        const editButton = screen.queryByLabelText('Edit profile');
        const sendMessageButton = await screen.findByLabelText('Send message');
        const pokeButton = await screen.findByLabelText('Poke');

        expect(editButton).not.toBeInTheDocument();
        expect(sendMessageButton).toBeInTheDocument();
        expect(pokeButton).toBeInTheDocument();
    });
});
