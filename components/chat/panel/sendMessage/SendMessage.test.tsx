import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { SendMessage } from '@components/chat/panel/sendMessage/SendMessage';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mock } from '@libs/nock';
import CreatePostSuccessResponseJson from '@mocks/posts/actions/createPostSuccess.json';
import { mockResizeObserver } from '@utils/mockResizeObserver';

describe('SendMessage component', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        mockResizeObserver();
    });

    it('renders like component instead of submit on start', () => {
        renderWithDefaultData(<SendMessage />);

        const likeComponent = screen.getByLabelText('Send like');

        expect(likeComponent).toBeVisible();
    });

    it('change like component to submit when input is not empty', async () => {
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
        mock({
            path: '/api/messages',
            data: CreatePostSuccessResponseJson,
            method: 'post',
        });

        renderWithDefaultData(<SendMessage />);

        const input = screen.getByLabelText('Message input');
        await user.type(input, 'Test message');

        const submitComponent = await screen.findByLabelText('Send message');
        await user.click(submitComponent);

        await waitFor(() => {
            expect(input).toHaveValue('');
        });
    });

    it('input has properly width with and without value', async () => {
        renderWithDefaultData(<SendMessage />);

        const input = screen.getByLabelText('Message input');
        const container = screen.getByTestId('message-input-container');

        expect(container).toHaveClass('w-36');

        await user.type(input, 'Type of Web');

        expect(input).toHaveValue('Type of Web');
        expect(container).toHaveClass('w-52');

        await user.clear(input);

        expect(container).toHaveClass('w-36');
    });

    it('can open emojis list and add one to message', async () => {
        renderWithDefaultData(<SendMessage />);

        const input = screen.getByLabelText('Message input');

        await user.type(input, 'Hello ');

        expect(input).toHaveValue('Hello ');

        const emojiButton = screen.getByLabelText('Choose an emoji');

        await user.click(emojiButton);

        const emojiList = screen.getAllByLabelText('Emojis list');
        expect(emojiList[0]).toBeInTheDocument();

        const emoji = screen.getAllByText('👋');
        await user.click(emoji[0]);

        await waitFor(() => {
            expect(input).toHaveValue('Hello 👋');
        });
    });

    it('can create message with only emojis', async () => {
        renderWithDefaultData(<SendMessage />);

        const emojiButton = screen.getByLabelText('Choose an emoji');
        await user.click(emojiButton);

        await user.click(screen.getAllByText('😃')[0]);

        const input = screen.getByLabelText('Message input');

        await waitFor(() => {
            expect(input).toHaveValue('😃');
        });
    });
});
