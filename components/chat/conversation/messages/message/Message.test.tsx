import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Message } from '@components/chat/conversation/messages/message/Message';
import { screen } from '@testing-library/react';
import MessagesFirstPageJson from '@mocks/chat/firstPage.json';
import FriendJson from '@mocks/user/johnDoe.json';
import { IChatMessage } from '@utils/types';

describe('Message component', () => {
    const { id, content, status, read_at, created_at } = MessagesFirstPageJson.data[0] as IChatMessage;
    const friend = FriendJson;

    it('Sent message has properly aria-label', () => {
        renderWithDefaultData(
            <Message
                isLastRead={false}
                id={id}
                content={content}
                is_received={false}
                status={status}
                read_at={read_at}
                created_at={created_at}
                senderAvatar={friend.profile_image}
            />
        );

        const message = screen.getByLabelText('Message sent');

        expect(message).toBeInTheDocument();
    });

    it('Received message has properly aria-label', () => {
        renderWithDefaultData(
            <Message
                isLastRead={false}
                id={id}
                content={content}
                is_received={true}
                status={status}
                read_at={read_at}
                created_at={created_at}
                senderAvatar={friend.profile_image}
            />
        );

        const message = screen.getByLabelText('Message received');

        expect(message).toBeInTheDocument();
    });

    it('Sent message has properly styles', () => {
        renderWithDefaultData(
            <Message
                isLastRead={false}
                id={id}
                content={content}
                is_received={false}
                status={status}
                read_at={read_at}
                created_at={created_at}
                senderAvatar={friend.profile_image}
            />
        );

        const message = screen.getByText(content);

        expect(message).toHaveClass('ml-auto');
        expect(message).toHaveClass('bg-primary');
    });

    it('Received message has properly styles', () => {
        renderWithDefaultData(
            <Message
                isLastRead={false}
                id={id}
                content={content}
                is_received={true}
                status={status}
                read_at={read_at}
                created_at={created_at}
                senderAvatar={friend.profile_image}
            />
        );

        const message = screen.getByText(content);

        expect(message).not.toHaveClass('ml-auto');
        expect(message).toHaveClass('bg-dark-100');
    });

    it('Render avatar as status icon when isLastRead is true', () => {
        renderWithDefaultData(
            <Message
                isLastRead={true}
                id={id}
                content={content}
                is_received={false}
                status={status}
                read_at={read_at}
                created_at={created_at}
                senderAvatar={friend.profile_image}
            />
        );

        const avatar = screen.getByTitle(`Seen at ${read_at}`);

        expect(avatar).toBeInTheDocument();
    });

    it('Render avatar as status icon when isLastRead is true', () => {
        renderWithDefaultData(
            <Message
                isLastRead={true}
                id={id}
                content={content}
                is_received={false}
                status={status}
                read_at={read_at}
                created_at={created_at}
                senderAvatar={friend.profile_image}
            />
        );

        const avatar = screen.getByTitle(`Seen at ${read_at}`);

        expect(avatar).toBeInTheDocument();
    });

    it('can render empty status icon', () => {
        renderWithDefaultData(
            <Message
                isLastRead={false}
                id={id}
                content={content}
                is_received={false}
                status={status}
                read_at={read_at}
                created_at={created_at}
                senderAvatar={friend.profile_image}
            />
        );

        const emptyStatusIcon = screen.getByTestId('statusIcon-empty');

        expect(emptyStatusIcon).toBeInTheDocument();
    });

    it('render delivered status icon when messaged was delivered', () => {
        renderWithDefaultData(
            <Message
                isLastRead={false}
                id={id}
                content={content}
                is_received={false}
                status="DELIVERED"
                read_at={read_at}
                created_at={created_at}
                senderAvatar={friend.profile_image}
            />
        );

        const deliveredStatusIcon = screen.getByTitle('Delivered');

        expect(deliveredStatusIcon).toBeInTheDocument();
    });

    it('render sending status icon when messaged is sending', () => {
        renderWithDefaultData(
            <Message
                isLastRead={false}
                id={id}
                content={content}
                is_received={false}
                status="SENDING"
                read_at={read_at}
                created_at={created_at}
                senderAvatar={friend.profile_image}
            />
        );

        const sendingStatusIcon = screen.getByTitle('Sending');

        expect(sendingStatusIcon).toBeInTheDocument();
    });
});
