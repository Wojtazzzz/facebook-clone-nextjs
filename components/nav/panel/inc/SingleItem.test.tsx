import { screen } from '@testing-library/react';
import MessengerFirstPageJson from '@mocks/messenger/firstPage.json';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { SingleItem } from '@components/nav/panel/inc/SingleItem';

describe('SingleItem component', () => {
    const mockCallback = jest.fn();
    const user = MessengerFirstPageJson[0];

    it('it renders user avatar, name, label', () => {
        renderWithDefaultData(
            <SingleItem
                ariaLabel="Some label"
                title={user.name}
                description="Click to open chat"
                image={user.profile_image}
                callback={mockCallback}
            />
        );

        const avatar = screen.getByRole('img');
        const name = screen.getByText(user.name);
        const label = screen.getByText('Click to open chat');

        expect(avatar).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(label).toBeInTheDocument();
    });

    it('it execute callback function on click', () => {
        renderWithDefaultData(
            <SingleItem
                ariaLabel="Some label"
                title={user.name}
                description="Click to open chat"
                image={user.profile_image}
                callback={mockCallback}
            />
        );

        const button = screen.getByLabelText('Some label');
        button.click();

        expect(mockCallback).toBeCalledTimes(1);
    });
});
