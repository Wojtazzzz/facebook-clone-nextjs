import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { LikeButton } from '@components/pages/posts/post/panel/LikeButton';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import LikeSuccessReponseJson from '@mocks/posts/actions/likeSuccess.json';
import UnlikeSuccessReponseJson from '@mocks/posts/actions/unlikeSuccess.json';
import { screen, waitFor } from '@testing-library/react';
import { mock } from '@libs/nock';

describe('LikeButton component', () => {
    const post = PostsFirstPageJson[0];
    const mockSetTotalLikes = jest.fn();

    it('has active (blue) button when post is liked', () => {
        renderWithDefaultData(<LikeButton postId={post.id} isLiked={true} setTotalLikes={mockSetTotalLikes} />);

        const button = screen.getByRole('button');

        expect(button).toHaveClass('text-primary');
    });

    it('has deactive (white) button when post is not liked', () => {
        renderWithDefaultData(<LikeButton postId={post.id} isLiked={false} setTotalLikes={mockSetTotalLikes} />);

        const button = screen.getByRole('button');

        expect(button).toHaveClass('text-light-100');
    });

    it('change color to blue when try to like post (success)', async () => {
        mock('/api/likes', 200, LikeSuccessReponseJson, 'POST');

        renderWithDefaultData(<LikeButton postId={post.id} isLiked={false} setTotalLikes={mockSetTotalLikes} />);

        const button = screen.getByRole('button');
        button.click();

        await waitFor(() => {
            expect(button).toHaveClass('text-primary');
        });
    });

    it('stay with white color when try to like post (error)', async () => {
        mock('/api/likes', 500, {}, 'POST');

        renderWithDefaultData(<LikeButton postId={post.id} isLiked={false} setTotalLikes={mockSetTotalLikes} />);

        const button = screen.getByRole('button');
        button.click();

        await waitFor(() => {
            expect(button).toHaveClass('text-light-100');
        });
    });

    it('change color to white when try to unlike post (success)', async () => {
        mock(`/api/likes/${post.id}`, 200, UnlikeSuccessReponseJson, 'DELETE');

        renderWithDefaultData(<LikeButton postId={post.id} isLiked={true} setTotalLikes={mockSetTotalLikes} />);

        const button = screen.getByRole('button');
        button.click();

        await waitFor(() => {
            expect(button).toHaveClass('text-light-100');
        });
    });

    it('stay with blue color when try to unlike post (error)', async () => {
        mock(`/api/likes/${post.id}`, 500, {}, 'DELETE');

        renderWithDefaultData(<LikeButton postId={post.id} isLiked={true} setTotalLikes={mockSetTotalLikes} />);

        const button = screen.getByRole('button');
        button.click();

        await waitFor(() => {
            expect(button).toHaveClass('text-primary');
        });
    });
});
