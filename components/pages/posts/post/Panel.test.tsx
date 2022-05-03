import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { Panel } from '@components/pages/posts/post/Panel';

describe('Panel component', () => {
    it('render like, comment and share buttons', () => {
        const mockHandleLike = jest.fn();

        renderWithDefaultData(<Panel isLiked={false} handleLike={mockHandleLike} />);

        const likeButton = screen.getByLabelText('Like');
        const commentButton = screen.getByLabelText('Comment');
        const shareButton = screen.getByLabelText('Share');

        expect(likeButton).toBeInTheDocument();
        expect(commentButton).toBeInTheDocument();
        expect(shareButton).toBeInTheDocument();
    });
});
