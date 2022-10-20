import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { Panel } from './Panel';
import { getPostsQK } from '@utils/queryKeys';

describe('Panel component tests', () => {
    const queryKey = getPostsQK({ type: 'all' });
    const mockToggleCommentsActive = jest.fn();

    it('render LikeButton', async () => {
        renderWithDefaultData(
            <Panel postId={1} isLiked={false} queryKey={queryKey} toggleCommentsActive={mockToggleCommentsActive} />
        );

        const likeButton = screen.getByLabelText('Like');

        expect(likeButton).toBeInTheDocument();
    });

    it('render CommentButton', async () => {
        renderWithDefaultData(
            <Panel postId={1} isLiked={false} queryKey={queryKey} toggleCommentsActive={mockToggleCommentsActive} />
        );

        const commentButton = screen.getByLabelText('Comment');

        expect(commentButton).toBeInTheDocument();
    });

    it('render ShareButton', async () => {
        renderWithDefaultData(
            <Panel postId={1} isLiked={false} queryKey={queryKey} toggleCommentsActive={mockToggleCommentsActive} />
        );

        const shareButton = screen.getByLabelText('Share');

        expect(shareButton).toBeInTheDocument();
    });
});
