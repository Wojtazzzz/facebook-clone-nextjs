import { mock } from '@utils/nock';
import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Trigger } from './Trigger';
import * as Popover from '@radix-ui/react-popover';
import userEvent from '@testing-library/user-event';

describe('Trigger component tests', () => {
    const user = userEvent.setup();

    it('have properly label', () => {
        const mockOpen = jest.fn();

        mock({
            path: '/api/notifications/check-unread',
            data: false,
        });

        renderWithDefaultData(
            <Popover.Root>
                <Trigger open={mockOpen} />
            </Popover.Root>
        );

        const button = screen.getByLabelText('Notifications');

        expect(button).toBeInTheDocument();
    });

    it('execute open function by click', async () => {
        const mockOpen = jest.fn();

        mock({
            path: '/api/notifications/check-unread',
            data: false,
        });

        renderWithDefaultData(
            <Popover.Root>
                <Trigger open={mockOpen} />
            </Popover.Root>
        );

        const button = screen.getByLabelText('Notifications');

        await user.click(button);

        expect(mockOpen).toHaveBeenCalledTimes(1);
    });

    it('not render alert when api return false', () => {
        const mockOpen = jest.fn();

        mock({
            path: '/api/notifications/check-unread',
            data: false,
        });

        renderWithDefaultData(
            <Popover.Root>
                <Trigger open={mockOpen} />
            </Popover.Root>
        );

        const alert = screen.queryByTestId('alert');

        expect(alert).not.toBeInTheDocument();
    });

    it('render alert when api return true', async () => {
        const mockOpen = jest.fn();

        mock({
            path: '/api/notifications/check-unread',
            data: true,
        });

        renderWithDefaultData(
            <Popover.Root>
                <Trigger open={mockOpen} />
            </Popover.Root>
        );

        const alert = await screen.findByTestId('alert');

        expect(alert).toBeInTheDocument();
    });
});
