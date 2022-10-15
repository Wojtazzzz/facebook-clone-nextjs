import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mock } from '@utils/nock';
import { Form } from './Form';

describe('Form component', () => {
    const user = userEvent.setup();
    const post = PostsFirstPageJson.data[0];

    it('can write on input', async () => {
        const mockCloseEditMode = jest.fn();

        renderWithDefaultData(<Form content="x" commentId={1} closeEditMode={mockCloseEditMode} postId={post.id} />);

        const input = screen.getByLabelText('Update a comment');
        await user.type(input, 'John Doe');

        expect(input).toHaveValue('xJohn Doe');
    });

    it('"Comment must be at least 2 characters" validation error', async () => {
        const mockCloseEditMode = jest.fn();

        renderWithDefaultData(<Form content="x" commentId={1} closeEditMode={mockCloseEditMode} postId={post.id} />);

        const input = screen.getByLabelText('Update a comment');

        await user.clear(input);
        await user.type(input, 'a');

        const submitButton = screen.getByLabelText('Send updated comment');
        await user.click(submitButton);

        const validationError = await screen.findByText('Comment must be at least 2 characters');

        expect(validationError).toBeInTheDocument();
    });

    it('"Comment must contain text" validation error', async () => {
        const mockCloseEditMode = jest.fn();

        renderWithDefaultData(<Form content="x" commentId={1} closeEditMode={mockCloseEditMode} postId={post.id} />);

        const input = screen.getByLabelText('Update a comment');
        await user.clear(input);

        const submitButton = screen.getByLabelText('Send updated comment');
        await user.click(submitButton);

        const validationError = await screen.findByText('Comment must contain text');

        expect(validationError).toBeInTheDocument();
    });

    jest.setTimeout(30000);

    it('"Comment must be at most 1000 characters" validation error', async () => {
        const mockCloseEditMode = jest.fn();

        renderWithDefaultData(<Form content="x" commentId={1} closeEditMode={mockCloseEditMode} postId={post.id} />);

        const input = screen.getByLabelText('Update a comment');
        await user.type(input, LONG_TEXT);

        const submitButton = screen.getByLabelText('Send updated comment');
        await user.click(submitButton);

        const validationError = await screen.findByText('Comment must be at most 1000 characters');

        expect(validationError).toBeInTheDocument();
    });

    it('close edit mode when comment updated', async () => {
        const mockCloseEditMode = jest.fn();

        mock({
            path: `/api/posts/${post.id}/comments/1`,
            status: 201,
            method: 'put',
        });

        renderWithDefaultData(<Form content="x" commentId={1} closeEditMode={mockCloseEditMode} postId={post.id} />);

        const input = screen.getByLabelText('Update a comment');
        await user.type(input, 'xJohn Doe is super surface app user!');

        const submitButton = screen.getByLabelText('Send updated comment');

        await user.click(submitButton);

        await waitFor(() => {
            expect(mockCloseEditMode).toHaveBeenCalledTimes(1);
        });
    });
});

const LONG_TEXT =
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
