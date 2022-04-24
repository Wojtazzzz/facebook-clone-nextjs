import { screen } from '@testing-library/react';
import MessengerFirstPageJson from '@mocks/messenger/firstPage.json';
import { Slot } from '@components/nav/additions/messenger/Slot';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';

describe('Messenger slot component', () => {
    it('it renders user avatar, name, label', async () => {
        const user = MessengerFirstPageJson[0];

        renderWithDefaultData(
            <Slot id={user.id} name={user.name} first_name={user.first_name} profile_image={user.profile_image} />
        );

        const avatar = screen.getByAltText(user.name);
        const name = screen.getByText(user.name);
        const label = screen.getByText('Click to open chat');

        expect(avatar).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(label).toBeInTheDocument();
    });
});
