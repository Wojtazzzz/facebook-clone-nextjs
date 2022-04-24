import { screen } from '@testing-library/react';
import nock from 'nock';
import { nockReplyHeaders } from '@libs/nockReplyHeaders';
import PokesFirstPageJson from '@mocks/friendsList/pokes/firstPage.json';
import { Slot } from '@components/pages/friends/Slot';
import { Actions } from '@components/pages/friends/actions/Actions';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';

describe('Single poke component', () => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

    beforeEach(() => {
        nock.disableNetConnect();

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/pokes?page=1').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).get('/api/pokes?page=1').reply(200, PokesFirstPageJson);
    });

    it('renders user image, name, poked data', async () => {
        const user = PokesFirstPageJson[0];

        renderWithDefaultData(
            <Slot key={user.id} {...user}>
                <Actions friend={user} type="pokes" />
            </Slot>
        );

        const userName = await screen.findByText(user.name);
        const userProfileImage = await screen.findByAltText(user.name);
        const pokesCount = await screen.findByText(
            `${user.first_name} poked you ${user.poke_info.count} times in a row`
        );
        const pokeDate = await screen.findByText(user.poke_info.updated_at);

        expect(userProfileImage).toBeInTheDocument();
        expect(userName).toBeInTheDocument();
        expect(pokesCount).toBeInTheDocument();
        expect(pokeDate).toBeInTheDocument();
    });

    it('shows success message on successfully poke', async () => {
        const user = PokesFirstPageJson[0];

        renderWithDefaultData(
            <Slot key={user.id} {...user}>
                <Actions friend={user} type="pokes" />
            </Slot>
        );

        const pokeButton = await screen.findByTitle('Poke back');
        expect(pokeButton).toBeInTheDocument();

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/pokes/update').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).post('/api/pokes/update').reply(201);

        pokeButton.click();

        const successMessage = await screen.findByText('Friend poked back');
        expect(successMessage).toBeInTheDocument();
    });

    it('shows error message on failed poke', async () => {
        const user = PokesFirstPageJson[0];

        renderWithDefaultData(
            <Slot key={user.id} {...user}>
                <Actions friend={user} type="pokes" />
            </Slot>
        );

        const pokeButton = await screen.findByTitle('Poke back');
        expect(pokeButton).toBeInTheDocument();

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/pokes/update').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).post('/api/pokes/update').reply(500);

        pokeButton.click();

        const errorMessage = await screen.findByText('Something went wrong');
        expect(errorMessage).toBeInTheDocument();
    });
});
