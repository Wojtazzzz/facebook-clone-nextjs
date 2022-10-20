import { mock } from '@utils/nock';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Messenger } from './Messenger';
import MessengerFirstPageJson from '@mocks/messenger/firstPage.json';
import { mockResizeObserver } from '@utils/tests/mockResizeObserver';

describe('Messenger component tests', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        mockResizeObserver();

        mock({
            path: '/api/messenger?page=1',
            data: MessengerFirstPageJson,
        });

        mock({
            path: '/api/messenger/check-unread',
            data: [false],
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

    it('close dropdown by click on close button', async () => {
        renderWithDefaultData(<Messenger />);

        const button = screen.getByLabelText('Messenger');
        await user.click(button);

        const dropdown = screen.getByTestId('dropdown');

        expect(dropdown).toBeInTheDocument();

        const closeButton = screen.getByLabelText('Close dropdown');
        await user.click(closeButton);

        expect(dropdown).not.toBeInTheDocument();
    });

    it('dropdown render properly list', async () => {
        renderWithDefaultData(<Messenger />);

        const button = screen.getByLabelText('Messenger');
        await user.click(button);

        const list = await screen.findByTestId('messenger-list');

        expect(list).toBeInTheDocument();
    });

    it('render properly header', async () => {
        mock({
            path: '/api/messages?page=1',
            data: MessengerFirstPageJson,
        });

        renderWithDefaultData(<Messenger />);

        const button = screen.getByLabelText('Messenger');
        await user.click(button);

        const header = screen.getByText('Messenger');

        expect(header).toBeInTheDocument();
    });
});
