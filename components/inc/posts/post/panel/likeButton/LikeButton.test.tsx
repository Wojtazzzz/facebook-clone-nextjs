import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import { screen } from '@testing-library/react';
import { LikeButton } from './LikeButton';
import { getPostsQK } from '@utils/queryKeys';

describe('LikeButton component tests', () => {
    const queryKey = getPostsQK({ type: 'all' });
    const post = PostsFirstPageJson.data[0];

    it('has active (blue) button when post is liked', () => {
        renderWithDefaultData(<LikeButton queryKey={queryKey} postId={post.id} isLiked={true} />);

        const button = screen.getByLabelText('Like');

        expect(button).toHaveClass('text-primary-light');
    });

    it('has deactive (white) button when post is not liked', () => {
        renderWithDefaultData(<LikeButton queryKey={queryKey} postId={post.id} isLiked={false} />);

        const button = screen.getByLabelText('Like');

        expect(button).toHaveClass('text-light-100');
    });
});
