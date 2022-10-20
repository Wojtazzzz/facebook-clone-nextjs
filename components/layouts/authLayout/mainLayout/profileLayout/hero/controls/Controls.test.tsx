import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import RootUserJson from '@mocks/user/root.json';
import JohnDoeUserJson from '@mocks/user/johnDoe.json';
import { mock } from '@utils/nock';
import { screen } from '@testing-library/react';
import { Controls } from './Controls';

describe('Controls component tests', () => {
    beforeEach(() => {
        mock({
            path: '/api/user',
            data: RootUserJson,
        });
    });

    it("render AuthControls when profile is logged user's, GuestControls not showed", async () => {
        renderWithDefaultData(<Controls pageUser={RootUserJson} />);

        const editButton = await screen.findByLabelText('Edit profile');
        const sendMessageButton = screen.queryByLabelText('Message');
        const pokeButton = screen.queryByLabelText('Poke');

        expect(editButton).toBeInTheDocument();
        expect(sendMessageButton).not.toBeInTheDocument();
        expect(pokeButton).not.toBeInTheDocument();
    });

    it("render GuestControls when profile is not logged user's, AuthControls not showed", async () => {
        renderWithDefaultData(<Controls pageUser={JohnDoeUserJson} />);

        const editButton = screen.queryByLabelText('Edit profile');
        const sendMessageButton = await screen.findByLabelText('Message');
        const pokeButton = await screen.findByLabelText('Poke');

        expect(editButton).not.toBeInTheDocument();
        expect(sendMessageButton).toBeInTheDocument();
        expect(pokeButton).toBeInTheDocument();
    });
});
