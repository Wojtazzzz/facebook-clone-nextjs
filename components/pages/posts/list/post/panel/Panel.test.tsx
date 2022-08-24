import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { Panel } from './Panel';

describe('Panel component', () => {
    it('render LikeButton', async () => {
        const mockToggleAreCommentsActive = jest.fn();

        renderWithDefaultData(
            <Panel postId={1} isPostLiked={false} toggleAreCommentsActive={mockToggleAreCommentsActive} />
        );

        const likeButton = screen.getByLabelText('Like');

        expect(likeButton).toBeInTheDocument();
    });

    it('render CommentButton', async () => {
        const mockToggleAreCommentsActive = jest.fn();

        renderWithDefaultData(
            <Panel postId={1} isPostLiked={false} toggleAreCommentsActive={mockToggleAreCommentsActive} />
        );

        const commentButton = screen.getByLabelText('Comment');

        expect(commentButton).toBeInTheDocument();
    });

    it('render ShareButton', async () => {
        const mockToggleAreCommentsActive = jest.fn();

        renderWithDefaultData(
            <Panel postId={1} isPostLiked={false} toggleAreCommentsActive={mockToggleAreCommentsActive} />
        );

        const shareButton = screen.getByLabelText('Share');

        expect(shareButton).toBeInTheDocument();
    });
});
