import { screen } from '@testing-library/react';
import MessengerFirstPageJson from '@mocks/messenger/firstPage.json';
import { Conversation } from '@components/nav/panel/messenger/list/Conversation';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';

describe('Conversation component', () => {
    it('render user avatar, name, label', () => {
        const user = MessengerFirstPageJson.data[0];

        renderWithDefaultData(<Conversation friend={user} />);

        const avatar = screen.getByRole('img');
        const name = screen.getByText(user.name);
        const label = screen.getByText('Click to open chat');

        expect(avatar).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(label).toBeInTheDocument();
    });
});
