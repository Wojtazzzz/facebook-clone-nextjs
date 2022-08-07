import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { CreateForm } from '@components/pages/posts/post/comments/create/CreateForm';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import CommentSuccessResponseJson from '@mocks/posts/comments/actions/createCommentSuccess.json';
import CommentsFirstPageJson from '@mocks/posts/comments/firstPage.json';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mock } from '@libs/nock';

describe('CreateForm component', () => {
    jest.setTimeout(30000);

    const user = userEvent.setup();
    const post = PostsFirstPageJson.data[0];

    beforeEach(() => {
        mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsFirstPageJson);
        mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsFirstPageJson);
    });

    it('can write on input', async () => {
        renderWithDefaultData(<CreateForm postId={post.id} />);

        const input = screen.getByLabelText('Write a comment');
        await user.type(input, 'John Doe');

        expect(input).toHaveValue('John Doe');
    });

    it('clear input when comment was created', async () => {
        mock(`/api/posts/${post.id}/comments`, 201, CommentSuccessResponseJson, 'post');

        renderWithDefaultData(<CreateForm postId={post.id} />);

        const input = screen.getByLabelText('Write a comment');
        await user.type(input, 'John Doe is super facebook-clone user!');

        const submitButton = screen.getByLabelText('Submit comment');
        await user.click(submitButton);

        await waitFor(() => {
            expect(input).toHaveValue('');
        });
    });

    it('not clear input when create api return error', async () => {
        mock(`/api/posts/${post.id}/comments`, 500, {}, 'post');

        renderWithDefaultData(<CreateForm postId={post.id} />);

        const input = screen.getByLabelText('Write a comment');
        await user.type(input, 'John Doe is super facebook-clone user!');

        const submitButton = screen.getByLabelText('Submit comment');
        await user.click(submitButton);

        await waitFor(() => {
            expect(input).toHaveValue('John Doe is super facebook-clone user!');
        });
    });

    it('"Comment must be at least 2 characters" validation error', async () => {
        renderWithDefaultData(<CreateForm postId={post.id} />);

        const input = screen.getByLabelText('Write a comment');
        await user.type(input, 'a');

        const submitButton = screen.getByLabelText('Submit comment');
        await user.click(submitButton);

        const validationError = await screen.findByText('Comment must be at least 2 characters');

        expect(validationError).toBeInTheDocument();
    });

    it('"Comment must contain text" validation error', async () => {
        renderWithDefaultData(<CreateForm postId={post.id} />);

        const submitButton = screen.getByLabelText('Submit comment');
        await user.click(submitButton);

        const validationError = await screen.findByText('Comment must contain text');

        expect(validationError).toBeInTheDocument();
    });

    it('"Comment must be at most 1000 characters" validation error', async () => {
        renderWithDefaultData(<CreateForm postId={post.id} />);

        const input = screen.getByLabelText('Write a comment');
        await user.type(input, LONG_TEXT);

        const submitButton = screen.getByLabelText('Submit comment');
        await user.click(submitButton);

        const validationError = await screen.findByText('Comment must be at most 1000 characters');

        expect(validationError).toBeInTheDocument();
    });
});

const LONG_TEXT =
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
