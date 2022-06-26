import { screen } from '@testing-library/react';
import MessengerFirstPageJson from '@mocks/messenger/firstPage.json';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { SingleItem } from '@components/nav/panel/inc/SingleItem';
import userEvent from '@testing-library/user-event';

describe('SingleItem component', () => {
    const user = userEvent.setup();
    const mockCallback = jest.fn();
    const jsonUser = MessengerFirstPageJson[0];

    it('it renders user avatar, name, label', () => {
        renderWithDefaultData(
            <SingleItem
                title={jsonUser.name}
                message="Click to open chat"
                image={jsonUser.profile_image}
                callback={mockCallback}
            />
        );

        const avatar = screen.getByRole('img');
        const name = screen.getByText(jsonUser.name);
        const label = screen.getByText('Click to open chat');

        expect(avatar).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(label).toBeInTheDocument();
    });

    it('it execute callback function on click', async () => {
        renderWithDefaultData(
            <SingleItem
                title={jsonUser.name}
                message="Click to open chat"
                image={jsonUser.profile_image}
                callback={mockCallback}
            />
        );

        const button = screen.getByRole('button');
        await user.click(button);

        expect(mockCallback).toBeCalledTimes(1);
    });
});
