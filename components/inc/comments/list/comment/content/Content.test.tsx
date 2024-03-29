import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Content } from './Content';
import CommentFirstPageJson from '@mocks/posts/comments/firstPage.json';
import { screen } from '@testing-library/react';

describe('Content component tests', () => {
    const { content: commentContent, commentable_id, id, likes_count, author } = CommentFirstPageJson.data[0];
    const mockCloseEditMode = jest.fn();

    it('display properly author name (as link) and comment content', () => {
        renderWithDefaultData(
            <Content
                content={commentContent}
                commentId={id}
                likesCount={likes_count}
                authorName={author.name}
                isEditModeActive={false}
                closeEditMode={mockCloseEditMode}
                authorId={author.id}
                postId={commentable_id}
            />
        );

        const authorName = screen.getByText(author.name);
        const content = screen.getByText(commentContent);

        expect(authorName).toBeInTheDocument();
        expect(authorName).toHaveAttribute('href', `/profile/${author.id}`);
        expect(content).toBeInTheDocument();
    });

    it('not display likes icon and amount when comment has no likes', () => {
        renderWithDefaultData(
            <Content
                content={commentContent}
                authorId={author.id}
                postId={commentable_id}
                commentId={id}
                likesCount={0}
                authorName={author.name}
                isEditModeActive={false}
                closeEditMode={mockCloseEditMode}
            />
        );

        const icon = screen.queryByTestId('comment-faTooltipIcon');
        const count = screen.queryByTestId('comment-likesCount');

        expect(icon).not.toBeInTheDocument();
        expect(count).not.toBeInTheDocument();
    });

    it('display only likes icon when comment has only one like', () => {
        renderWithDefaultData(
            <Content
                content={commentContent}
                authorId={author.id}
                postId={commentable_id}
                commentId={id}
                likesCount={1}
                authorName={author.name}
                isEditModeActive={false}
                closeEditMode={mockCloseEditMode}
            />
        );

        const icon = screen.getByTestId('comment-faTooltipIcon');
        const count = screen.queryByTestId('comment-likesCount');

        expect(icon).toBeInTheDocument();
        expect(count).not.toBeInTheDocument();
    });

    it('display likes icon and count when comment has more than one like', () => {
        renderWithDefaultData(
            <Content
                content={commentContent}
                authorId={author.id}
                postId={commentable_id}
                commentId={id}
                likesCount={2}
                authorName={author.name}
                isEditModeActive={false}
                closeEditMode={mockCloseEditMode}
            />
        );

        const icon = screen.getByTestId('comment-faTooltipIcon');
        const count = screen.getByTestId('comment-likesCount');

        expect(icon).toBeInTheDocument();
        expect(count).toBeInTheDocument();
    });
});
