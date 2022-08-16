import { mock } from '@libs/nock';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Messenger } from './Messenger';
import MessengerFirstPageJson from '@mocks/messenger/firstPage.json';

describe('Messenger component', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        mock({
            path: '/api/messages?page=1',
            data: MessengerFirstPageJson,
        });
    });

    it('not render dropdown by default', () => {
        renderWithDefaultData(<Messenger />);

        const dropdown = screen.queryByTestId('dropdown');

        expect(dropdown).not.toBeInTheDocument();
    });

    it('open dropdown by click on button', async () => {
        renderWithDefaultData(<Messenger />);

        const button = screen.getByLabelText('Messenger');
        await user.click(button);

        const dropdown = screen.getByTestId('dropdown');

        expect(dropdown).toBeInTheDocument();
    });

    it('dropdown render properly list', async () => {
        renderWithDefaultData(<Messenger />);

        const button = screen.getByLabelText('Messenger');
        await user.click(button);

        const list = await screen.findByTestId('messenger-list');

        expect(list).toBeInTheDocument();
    });
});
