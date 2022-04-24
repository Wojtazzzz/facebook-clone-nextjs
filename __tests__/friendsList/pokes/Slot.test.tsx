import { screen } from '@testing-library/react';
import nock from 'nock';
import PokesFirstPageJson from '@mocks/friendsList/pokes/firstPage.json';
import { Slot } from '@components/pages/friends/Slot';
import { Actions } from '@components/pages/friends/actions/Actions';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { mock } from '@libs/nock';

describe('Single poke component', () => {
    beforeEach(() => {
        nock.disableNetConnect();
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

        mock('/api/pokes/update', 201, {}, 'POST');

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

        mock('/api/pokes/update', 500, {}, 'POST');

        pokeButton.click();

        const errorMessage = await screen.findByText('Something went wrong');
        expect(errorMessage).toBeInTheDocument();
    });
});
