import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Message } from '@components/chat/conversation/messages/message/Message';
import { screen } from '@testing-library/react';
import MessagesFirstPageJson from '@mocks/chat/firstPage.json';
import FriendJson from '@mocks/user/johnDoe.json';
import { IChatMessage } from '@utils/types';
import userEvent from '@testing-library/user-event';

describe('Message and Zoom component', () => {
    const { id, status, read_at, created_at } = MessagesFirstPageJson.data[0] as IChatMessage;
    const friend = FriendJson;

    const user = userEvent.setup();

    it('Sent message has properly aria-label', () => {
        renderWithDefaultData(
            <Message
                isLastRead={false}
                id={id}
                content="Test content"
                images={[]}
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
                content="Test content"
                images={[]}
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

    it('Sent message has properly bg-color', () => {
        renderWithDefaultData(
            <Message
                isLastRead={false}
                id={id}
                content="Test content"
                images={[]}
                is_received={false}
                status={status}
                read_at={read_at}
                created_at={created_at}
                senderAvatar={friend.profile_image}
            />
        );

        const message = screen.getByText('Test content');

        expect(message).toHaveClass('bg-primary');
    });

    it('Received message has properly bg-color', () => {
        renderWithDefaultData(
            <Message
                isLastRead={false}
                id={id}
                content="Test content"
                images={[]}
                is_received={true}
                status={status}
                read_at={read_at}
                created_at={created_at}
                senderAvatar={friend.profile_image}
            />
        );

        const message = screen.getByText('Test content');

        expect(message).toHaveClass('bg-dark-100');
    });

    it('Render avatar as status icon when isLastRead is true', () => {
        renderWithDefaultData(
            <Message
                isLastRead={true}
                id={id}
                content="Test content"
                images={[]}
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
                content="Test content"
                images={[]}
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
                content="Test content"
                images={[]}
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
                content="Test content"
                images={[]}
                is_received={false}
                status="DELIVERED"
                read_at={read_at}
                created_at={created_at}
                senderAvatar={friend.profile_image}
            />
        );

        const deliveredStatusIcon = screen.getByTestId('statusIcon-delivered');

        expect(deliveredStatusIcon).toBeInTheDocument();
    });

    it('render sending status icon when messaged is sending', () => {
        renderWithDefaultData(
            <Message
                isLastRead={false}
                id={id}
                content="Test content"
                images={[]}
                is_received={false}
                status="SENDING"
                read_at={read_at}
                created_at={created_at}
                senderAvatar={friend.profile_image}
            />
        );

        const sendingStatusIcon = screen.getByTestId('statusIcon-sending');

        expect(sendingStatusIcon).toBeInTheDocument();
    });

    it('not render text when message has only image', () => {
        renderWithDefaultData(
            <Message
                isLastRead={false}
                id={id}
                images={['https://picsum.photos/seed/62e9858f09a5c/850/350']}
                is_received={false}
                status="SENDING"
                read_at={read_at}
                created_at={created_at}
                senderAvatar={friend.profile_image}
            />
        );

        const text = screen.queryByTestId('message-text');

        expect(text).not.toBeInTheDocument();
    });

    it('message may contain only images', () => {
        renderWithDefaultData(
            <Message
                isLastRead={false}
                id={id}
                images={[
                    'https://picsum.photos/seed/62e9858d59b19/850/350',
                    'https://picsum.photos/seed/62e9858f09a5c/850/350',
                ]}
                is_received={false}
                status="SENDING"
                read_at={read_at}
                created_at={created_at}
                senderAvatar={friend.profile_image}
            />
        );

        const images = screen.getAllByLabelText('Zoom image');

        expect(images).toHaveLength(2);
    });

    it('zoom is hidden by default', async () => {
        renderWithDefaultData(
            <Message
                isLastRead={false}
                id={id}
                images={['https://picsum.photos/seed/62e9858d59b19/850/350']}
                is_received={false}
                status="SENDING"
                read_at={read_at}
                created_at={created_at}
                senderAvatar={friend.profile_image}
            />
        );

        const zoom = screen.queryByLabelText('Zoom');

        expect(zoom).not.toBeInTheDocument();
    });

    it('open zoom by click on image', async () => {
        renderWithDefaultData(
            <Message
                isLastRead={false}
                id={id}
                images={['https://picsum.photos/seed/62e9858d59b19/850/350']}
                is_received={false}
                status="SENDING"
                read_at={read_at}
                created_at={created_at}
                senderAvatar={friend.profile_image}
            />
        );

        const image = screen.getByLabelText('Zoom image');

        await user.click(image);

        const zoom = screen.getByLabelText('Zoom');

        expect(zoom).toBeInTheDocument();
    });

    it('close zoom by click on close button', async () => {
        renderWithDefaultData(
            <Message
                isLastRead={false}
                id={id}
                images={['https://picsum.photos/seed/62e9858d59b19/850/350']}
                is_received={false}
                status="SENDING"
                read_at={read_at}
                created_at={created_at}
                senderAvatar={friend.profile_image}
            />
        );

        const image = screen.getByLabelText('Zoom image');

        await user.click(image);

        const zoom = screen.getByLabelText('Zoom');

        expect(zoom).toBeInTheDocument();

        const closeZoom = screen.getByLabelText('Close zoom');

        await user.click(closeZoom);

        expect(zoom).not.toBeInTheDocument();
    });
});
