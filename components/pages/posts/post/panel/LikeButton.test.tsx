import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { LikeButton } from '@components/pages/posts/post/panel/LikeButton';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import { screen } from '@testing-library/react';
import { mock } from '@libs/nock';
import userEvent from '@testing-library/user-event';
import nock from 'nock';

describe('LikeButton component', () => {
    const user = userEvent.setup();
    const post = PostsFirstPageJson[0];

    beforeEach(() => {
        nock.cleanAll();
    });

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

    it('change color to blue when try to like post (success)', async () => {
        mock(`/api/posts/${post.id}/likes`, 201, {}, 'post');

        renderWithDefaultData(<LikeButton postId={post.id} isLiked={false} />);

        const button = screen.getByLabelText('Like');
        await user.click(button);

        expect(button).toHaveClass('text-primary');
    });

    it('button dissapear and show error component when error on like post', async () => {
        mock(`/api/posts/${post.id}/likes`, 500, {}, 'post');

        renderWithDefaultData(<LikeButton postId={post.id} isLiked={false} />);

        const button = screen.getByLabelText('Like');
        await user.click(button);

        const error = await screen.findByTestId('like-apiError');

        expect(error).toBeInTheDocument();
        expect(button).not.toBeInTheDocument();
    });

    it('change color to white when try to unlike post (success)', async () => {
        mock(`/api/posts/${post.id}/likes`, 204, {}, 'delete');

        renderWithDefaultData(<LikeButton postId={post.id} isLiked={true} />);

        const button = screen.getByLabelText('Like');
        await user.click(button);

        expect(button).toHaveClass('text-light-100');
    });

    it('button dissapear and show error component when error on unlike post', async () => {
        mock(`/api/posts/${post.id}/likes`, 500, {}, 'delete');

        renderWithDefaultData(<LikeButton postId={post.id} isLiked={true} />);

        const button = screen.getByLabelText('Like');
        await user.click(button);

        const error = await screen.findByTestId('like-apiError');

        expect(error).toBeInTheDocument();
        expect(button).not.toBeInTheDocument();
    });
});
