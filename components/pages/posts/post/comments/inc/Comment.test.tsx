import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { Comment } from '@components/pages/posts/post/comments/inc/Comment';
import { mock } from '@libs/nock';
import CommentsFirstPageJson from '@mocks/posts/comments/firstPage.json';
import RootUserCommentJson from '@mocks/posts/comments/rootUserComment.json';
import EditedCommentJson from '@mocks/posts/comments/edited.json';
import RootUserJson from '@mocks/user/root.json';
import userEvent from '@testing-library/user-event';

describe('Comment component', () => {
    const user = userEvent.setup();
    const comment = CommentsFirstPageJson.data[0];
    const editedComment = EditedCommentJson;
    const rootUserComment = RootUserCommentJson;

    beforeEach(() => {
        mock('/api/user', 200, RootUserJson);
    });

    it("has link to author's profile", () => {
        renderWithDefaultData(<Comment {...comment} />);

        const link = screen.getByRole('link');

        expect(link).toHaveAttribute('href', `/profile/${comment.author.id}`);
    });

    it('display author name and comment content properly', () => {
        renderWithDefaultData(<Comment {...comment} />);

        const authorName = screen.getByText(comment.author.name);
        const commentContent = screen.getByText(comment.content);

        expect(authorName).toBeInTheDocument();
        expect(commentContent).toBeInTheDocument();
    });

    it('show that post was edited when updated_at and created_at are not same', () => {
        renderWithDefaultData(<Comment {...editedComment} />);

        const editedDate = screen.getByText(`${editedComment.updated_at} (Edited)`);

        expect(editedDate).toBeInTheDocument();
    });

    it('turn on edit mode when click on edit button', async () => {
        mock(`/api/posts/${comment.resource_id}/comments?page=1`, 200, CommentsFirstPageJson);

        renderWithDefaultData(<Comment {...rootUserComment} />);

        const editButton = await screen.findByLabelText('Edit');
        await user.click(editButton);

        const editInput = await screen.findByLabelText('Update comment', { selector: 'input' });

        expect(editInput).toBeVisible();
    });

    it("show Edit and Delete buttons when logged user is comment's author", async () => {
        renderWithDefaultData(<Comment {...rootUserComment} />);

        const editButton = await screen.findByLabelText('Edit');
        const deleteButton = await screen.findByLabelText('Delete');

        expect(editButton).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
    });

    it("not show Edit and Delete buttons when logged user is not comment's author", () => {
        renderWithDefaultData(<Comment {...comment} />);

        const editButton = screen.queryByLabelText('Edit');
        const deleteButton = screen.queryByLabelText('Delete');

        expect(editButton).not.toBeInTheDocument();
        expect(deleteButton).not.toBeInTheDocument();
    });
});
