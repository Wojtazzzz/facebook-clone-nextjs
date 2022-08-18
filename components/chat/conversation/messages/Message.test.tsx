import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Message } from '@components/chat/conversation/messages/Message';
import { screen } from '@testing-library/react';

describe('Message component', () => {
    it('Sent message has properly aria-label', () => {
        renderWithDefaultData(
            <Message id={1} text="Simple message" isReceived={false} created_at="2019-09-26T01:26:26.000000Z" />
        );

        const message = screen.getByLabelText('Sent message');

        expect(message).toBeInTheDocument();
    });

    it('Received message has properly aria-label', () => {
        renderWithDefaultData(
            <Message id={1} text="Simple message" isReceived={true} created_at="2019-09-26T01:26:26.000000Z" />
        );

        const message = screen.getByLabelText('Received message');

        expect(message).toBeInTheDocument();
    });

    it('Sent message has properly styles', () => {
        renderWithDefaultData(
            <Message id={1} text="Simple message" isReceived={false} created_at="2019-09-26T01:26:26.000000Z" />
        );

        const message = screen.getByText('Simple message');

        expect(message).toHaveClass('ml-auto');
        expect(message).toHaveClass('bg-primary');
    });

    it('Received message has properly styles', () => {
        renderWithDefaultData(
            <Message id={1} text="Simple message" isReceived={true} created_at="2019-09-26T01:26:26.000000Z" />
        );

        const message = screen.getByText('Simple message');

        expect(message).not.toHaveClass('ml-auto');
        expect(message).toHaveClass('bg-dark-100');
    });
});
