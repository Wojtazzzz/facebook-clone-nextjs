import { screen } from '@testing-library/react';
import MessengerFirstPageJson from '@mocks/messenger/firstPage.json';
import { Friend } from '@components/nav/panel/messenger/Friend';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';

describe('Messenger Friend component', () => {
    it('it renders user avatar, name, label', async () => {
        const user = MessengerFirstPageJson[0];

        renderWithDefaultData(
            <Friend id={user.id} name={user.name} first_name={user.first_name} profile_image={user.profile_image} />
        );

        const avatar = screen.getByAltText(user.name);
        const name = screen.getByText(user.name);
        const label = screen.getByText('Click to open chat');

        expect(avatar).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(label).toBeInTheDocument();
    });
});
