import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import { screen } from '@testing-library/react';
import { mock } from '@utils/nock';
import userEvent from '@testing-library/user-event';
import { LikeButton } from './LikeButton';

describe('LikeButton component', () => {
    const user = userEvent.setup();
    const post = PostsFirstPageJson.data[0];

    it('has active (blue) button when post is liked', () => {
        renderWithDefaultData(<LikeButton postId={post.id} isLiked={true} />);

        const button = screen.getByLabelText('Like');

        expect(button).toHaveClass('text-primary');
    });

    it('has deactive (white) button when post is not liked', () => {
        renderWithDefaultData(<LikeButton postId={post.id} isLiked={false} />);

        const button = screen.getByLabelText('Like');

        expect(button).toHaveClass('text-light-100');
    });

    it('render error instead of button when api return error', async () => {
        mock({
            path: `/api/posts/${post.id}/likes`,
            status: 500,
            method: 'post',
        });

        renderWithDefaultData(<LikeButton postId={post.id} isLiked={false} />);

        const button = screen.getByLabelText('Like');
        await user.click(button);

        const error = await screen.findByTestId('like-apiError');

        expect(error).toBeInTheDocument();
        expect(button).not.toBeInTheDocument();
    });
});
