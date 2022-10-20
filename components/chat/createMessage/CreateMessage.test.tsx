import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { CreateMessage } from '@components/chat/createMessage/CreateMessage';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { generateFile } from '@utils/tests/generateFile';
import { mock } from '@utils/nock';
import RootUserJson from '@mocks/user/root.json';
import { mockCreateObjectUrl } from '@utils/tests/mockCreateObjectUrl';
import { mockResizeObserver } from '@utils/tests/mockResizeObserver';

describe('CreateMessage component tests', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        mock({
            path: '/api/user',
            data: RootUserJson,
        });

        mock({
            path: '/api/broadcasting/auth',
            method: 'post',
        });

        mockCreateObjectUrl();
        mockResizeObserver();
    });

    it('render send message and send image buttons', () => {
        renderWithDefaultData(<CreateMessage />);

        const sendImageComponent = screen.getByLabelText('Add images');
        const sendMessageComponent = screen.getByTestId('sendMessage-form');

        expect(sendImageComponent).toBeInTheDocument();
        expect(sendMessageComponent).toBeInTheDocument();
    });

    it('render SendLike instead of SubmitMessage by default', () => {
        renderWithDefaultData(<CreateMessage />);

        const likeComponent = screen.getByLabelText('Send like');

        expect(likeComponent).toBeVisible();
    });

    it('render SubmitMessage instead of SendLike when input is not empty', async () => {
        renderWithDefaultData(<CreateMessage />);

        const likeComponent = screen.getByLabelText('Send like');
        expect(likeComponent).toBeVisible();

        const input = screen.getByLabelText('Message input');
        await user.type(input, 'Test message');

        const submitComponent = await screen.findByLabelText('Submit message');

        expect(input).toHaveValue('Test message');
        expect(submitComponent).toBeVisible();
    });

    it('input has properly width with and without content', async () => {
        renderWithDefaultData(<CreateMessage />);

        const input = screen.getByLabelText('Message input');
        const container = screen.getByTestId('message-input-container');

        expect(container).toHaveClass('w-36');

        await user.type(input, 'Type of Web');

        expect(input).toHaveValue('Type of Web');
        expect(container).toHaveClass('w-52');

        await user.clear(input);

        expect(container).toHaveClass('w-36');
    });

    it('input has properly width with and without images', async () => {
        renderWithDefaultData(<CreateMessage />);

        const input = screen.getByLabelText('Images', { selector: 'input' });
        const container = screen.getByTestId('message-input-container');

        expect(container).toHaveClass('w-36');

        await user.upload(input, generateFile('file1.png', 'image/png'));

        expect(container).toHaveClass('w-52');
    });

    it('can remove uploaded image', async () => {
        renderWithDefaultData(<CreateMessage />);

        const input = screen.getByLabelText('Images', { selector: 'input' });
        const container = screen.getByTestId('message-input-container');

        expect(container).toHaveClass('w-36');

        await user.upload(input, generateFile('file1.png', 'image/png'));

        expect(container).toHaveClass('w-52');

        const removeImgButton = screen.getByLabelText('Remove image');

        await user.click(removeImgButton);

        expect(container).toHaveClass('w-36');
    });

    it('can open emojis list and add one to message', async () => {
        renderWithDefaultData(<CreateMessage />);

        const input = screen.getByLabelText('Message input');

        await user.type(input, 'Hello ');

        expect(input).toHaveValue('Hello ');

        const emojiButton = screen.getByLabelText('Choose an emoji');

        await user.click(emojiButton);

        const emojiList = screen.getAllByLabelText('Emojis list');
        expect(emojiList[0]).toBeInTheDocument();

        const emoji = screen.getAllByText('👋');
        await user.click(emoji[0]);

        expect(input).toHaveValue('Hello 👋');
    });

    it('can create message with only emojis', async () => {
        renderWithDefaultData(<CreateMessage />);

        const emojiButton = screen.getByLabelText('Choose an emoji');
        await user.click(emojiButton);

        await user.click(screen.getAllByText('😃')[0]);

        const input = screen.getByLabelText('Message input');

        expect(input).toHaveValue('😃');
    });
});
