import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import CommentSuccessResponseJson from '@mocks/posts/comments/actions/createCommentSuccess.json';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mock } from '@utils/nock';
import { Form } from './Form';

describe('Form component', () => {
    const user = userEvent.setup();
    const post = PostsFirstPageJson.data[0];

    it('can write on input', async () => {
        renderWithDefaultData(<Form postId={post.id} />);

        const input = screen.getByLabelText('Write a comment');
        await user.type(input, 'John Doe');

        expect(input).toHaveValue('John Doe');
    });

    it('not clear input when api return error', async () => {
        mock({
            path: `/api/posts/${post.id}/comments`,
            status: 500,
            method: 'post',
        });

        renderWithDefaultData(<Form postId={post.id} />);

        const input = screen.getByLabelText('Write a comment');
        await user.type(input, 'John Doe is super facebook-clone user!');

        const submitButton = screen.getByLabelText('Send comment');
        await user.click(submitButton);

        await waitFor(() => {
            expect(input).toHaveValue('John Doe is super facebook-clone user!');
        });
    });

    it('"Comment must be at least 2 characters" validation error', async () => {
        renderWithDefaultData(<Form postId={post.id} />);

        const input = screen.getByLabelText('Write a comment');
        await user.type(input, 'a');

        const submitButton = screen.getByLabelText('Send comment');
        await user.click(submitButton);

        const validationError = await screen.findByText('Comment must be at least 2 characters');

        expect(validationError).toBeInTheDocument();
    });

    it('"Comment must contain text" validation error', async () => {
        renderWithDefaultData(<Form postId={post.id} />);

        const submitButton = screen.getByLabelText('Send comment');
        await user.click(submitButton);

        const validationError = await screen.findByText('Comment must contain text');

        expect(validationError).toBeInTheDocument();
    });

    jest.setTimeout(30000);

    it('"Comment must be at most 1000 characters" validation error', async () => {
        renderWithDefaultData(<Form postId={post.id} />);

        const input = screen.getByLabelText('Write a comment');
        await user.type(input, LONG_TEXT);

        const submitButton = screen.getByLabelText('Send comment');
        await user.click(submitButton);

        const validationError = await screen.findByText('Comment must be at most 1000 characters');

        expect(validationError).toBeInTheDocument();
    });

    it('clear input when comment was created', async () => {
        mock({
            path: `/api/posts/${post.id}/comments`,
            data: CommentSuccessResponseJson,
            status: 201,
            method: 'post',
        });

        renderWithDefaultData(<Form postId={post.id} />);

        const input = screen.getByLabelText('Write a comment');
        await user.type(input, 'John Doe is super facebook-clone user!');

        const submitButton = screen.getByLabelText('Send comment');

        await user.click(submitButton);

        await waitFor(() => {
            expect(input).toHaveValue('');
        });
    });
});

const LONG_TEXT =
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
