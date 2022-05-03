import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { MarkAsRead } from '@components/nav/panel/notifications/MarkAsRead';
import { screen, waitFor } from '@testing-library/react';
import { mock } from '@libs/nock';
import MarkAsReadJson from '@mocks/notifications/markAsRead.json';

describe('Notifications MarkAsRead component', () => {
    it('render properly', () => {
        renderWithDefaultData(<MarkAsRead />);

        const markAsReadButton = screen.getByText('Mark all as read');

        expect(markAsReadButton).toBeInTheDocument();
    });

    it('button change color to green and dissapears when api return success', async () => {
        mock('/api/notifications/mark-as-read', 200, MarkAsReadJson, 'post');

        renderWithDefaultData(<MarkAsRead />);

        const markAsReadButton = screen.getByText('Mark all as read');
        markAsReadButton.click();

        await waitFor(() => {
            expect(markAsReadButton).toHaveClass('text-green-400');
        });

        await waitFor(() => {
            expect(markAsReadButton).toHaveClass('opacity-0');
        });
    });

    it('button change color to red and dissapears when api return error', async () => {
        mock('/api/notifications/mark-as-read', 500, MarkAsReadJson, 'post');

        renderWithDefaultData(<MarkAsRead />);

        const markAsReadButton = screen.getByText('Mark all as read');
        markAsReadButton.click();

        await waitFor(() => {
            expect(markAsReadButton).toHaveClass('text-red-400');
        });

        await waitFor(() => {
            expect(markAsReadButton).toHaveClass('opacity-0');
        });
    });
});
