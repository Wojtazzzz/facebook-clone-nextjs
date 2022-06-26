import { screen } from '@testing-library/react';
import MessengerFirstPageJson from '@mocks/messenger/firstPage.json';
import { Friend } from '@components/nav/panel/messenger/Friend';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';

describe('Friend component', () => {
    it('it renders user avatar, name, label', () => {
        const user = MessengerFirstPageJson[0];

        renderWithDefaultData(<Friend friend={user} />);

        const avatar = screen.getByRole('img');
        const name = screen.getByText(user.name);
        const label = screen.getByText('Click to open chat');

        expect(avatar).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(label).toBeInTheDocument();
    });
});
