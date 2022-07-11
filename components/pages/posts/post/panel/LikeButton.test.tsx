import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { LikeButton } from '@components/pages/posts/post/panel/LikeButton';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import LikeSuccessReponseJson from '@mocks/posts/actions/likeSuccess.json';
import UnlikeSuccessReponseJson from '@mocks/posts/actions/unlikeSuccess.json';
import { screen, waitFor } from '@testing-library/react';
import { mock } from '@libs/nock';
import userEvent from '@testing-library/user-event';

describe('LikeButton component', () => {
    const user = userEvent.setup();
    const post = PostsFirstPageJson[0];
    const mockSetTotalLikes = jest.fn();

    it('has active (blue) button when post is liked', () => {
        renderWithDefaultData(<LikeButton postId={post.id} isLiked={true} setTotalLikes={mockSetTotalLikes} />);

        const buttonText = screen.getByText('Like');

        expect(buttonText).toHaveClass('text-primary');
    });

    it('has deactive (white) button when post is not liked', () => {
        renderWithDefaultData(<LikeButton postId={post.id} isLiked={false} setTotalLikes={mockSetTotalLikes} />);

        const buttonText = screen.getByText('Like');

        expect(buttonText).toHaveClass('text-light-100');
    });

    it('change color to blue when try to like post (success)', async () => {
        mock('/api/likes', 200, LikeSuccessReponseJson, 'post');

        renderWithDefaultData(<LikeButton postId={post.id} isLiked={false} setTotalLikes={mockSetTotalLikes} />);

        const button = screen.getByRole('button');
        await user.click(button);

        const buttonText = screen.getByText('Like');

        await waitFor(() => {
            expect(buttonText).toHaveClass('text-primary');
        });
    });

    it('stay with white color when try to like post (error)', async () => {
        mock('/api/likes', 500, {}, 'post');

        renderWithDefaultData(<LikeButton postId={post.id} isLiked={false} setTotalLikes={mockSetTotalLikes} />);

        const button = screen.getByRole('button');
        await user.click(button);

        const buttonText = screen.getByText('Like');

        await waitFor(() => {
            expect(buttonText).toHaveClass('text-light-100');
        });
    });

    it('change color to white when try to unlike post (success)', async () => {
        mock(`/api/likes/${post.id}`, 200, UnlikeSuccessReponseJson, 'delete');

        renderWithDefaultData(<LikeButton postId={post.id} isLiked={true} setTotalLikes={mockSetTotalLikes} />);

        const button = screen.getByRole('button');
        await user.click(button);

        const buttonText = screen.getByText('Like');

        await waitFor(() => {
            expect(buttonText).toHaveClass('text-light-100');
        });
    });

    it('stay with blue color when try to unlike post (error)', async () => {
        mock(`/api/likes/${post.id}`, 500, {}, 'delete');

        renderWithDefaultData(<LikeButton postId={post.id} isLiked={true} setTotalLikes={mockSetTotalLikes} />);

        const button = screen.getByRole('button');
        await user.click(button);

        const buttonText = screen.getByText('Like');

        await waitFor(() => {
            expect(buttonText).toHaveClass('text-primary');
        });
    });
});
