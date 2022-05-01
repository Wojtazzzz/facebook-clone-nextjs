import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { SendMessage } from '@components/chat/options/SendMessage';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('SendMessage component', () => {
    it('renders like component instead of submit on start', () => {
        renderWithDefaultData(<SendMessage />);

        const likeComponent = screen.getByLabelText('Send like');

        expect(likeComponent).toBeVisible();
    });

    it('change like component to submit when input is not empty', async () => {
        const user = userEvent.setup();

        renderWithDefaultData(<SendMessage />);

        const likeComponent = screen.getByLabelText('Send like');
        expect(likeComponent).toBeVisible();

        const input = screen.getByLabelText('Message input');
        await user.type(input, 'Test message');

        const submitComponent = await screen.findByLabelText('Send message');

        expect(input).toHaveValue('Test message');
        expect(submitComponent).toBeVisible();
    });

    it('clear input on sent message', async () => {
        const user = userEvent.setup();

        renderWithDefaultData(<SendMessage />);

        const input = screen.getByLabelText('Message input');
        await user.type(input, 'Test message');

        const submitComponent = await screen.findByLabelText('Send message');
        submitComponent.click();

        await waitFor(() => {
            expect(input).toHaveValue('');
        });
    });
});
