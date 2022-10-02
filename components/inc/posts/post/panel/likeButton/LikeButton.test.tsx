import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import { screen } from '@testing-library/react';
import { LikeButton } from './LikeButton';
import { getPostsQK } from '@utils/queryKeys';

describe('LikeButton component', () => {
    const post = PostsFirstPageJson.data[0];

    it('has active (blue) button when post is liked', () => {
        renderWithDefaultData(<LikeButton queryKey={getPostsQK({ type: 'all' })} postId={post.id} isLiked={true} />);

        const button = screen.getByLabelText('Like');

        expect(button).toHaveClass('text-primary');
    });

    it('has deactive (white) button when post is not liked', () => {
        renderWithDefaultData(<LikeButton queryKey={getPostsQK({ type: 'all' })} postId={post.id} isLiked={false} />);

        const button = screen.getByLabelText('Like');

        expect(button).toHaveClass('text-light-100');
    });
});
