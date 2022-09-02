import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import RootUserJson from '@mocks/user/root.json';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import CommentsFirstPageJson from '@mocks/posts/comments/firstPage.json';
import userEvent from '@testing-library/user-event';
import { mock } from '@libs/nock';
import { Post } from './Post';

describe('Post component', () => {
    const user = userEvent.setup();
    const post = PostsFirstPageJson.data[0];

    beforeEach(() => {
        mock({
            path: '/api/user',
            data: RootUserJson,
        });
    });

    it('render like, comment and share buttons', () => {
        renderWithDefaultData(<Post {...post} type="OWN" />);

        const likeButton = screen.getByLabelText('Like');
        const commentButton = screen.getByLabelText('Comment');
        const shareButton = screen.getByLabelText('Share');

        expect(likeButton).toBeInTheDocument();
        expect(commentButton).toBeInTheDocument();
        expect(shareButton).toBeInTheDocument();
    });

    it('not render comments section by default', async () => {
        renderWithDefaultData(<Post {...post} type="OWN" />);

        const commentsSection = screen.queryByLabelText('Post comments', { selector: 'section' });

        expect(commentsSection).not.toBeInTheDocument();
    });

    it('render comments section when click on button', async () => {
        mock({
            path: `/api/posts/${post.id}/comments?page=1`,
            data: CommentsFirstPageJson,
        });

        renderWithDefaultData(<Post {...post} type="OWN" />);

        const commentButton = screen.getByLabelText('Comment');
        await user.click(commentButton);

        const commentsSection = screen.queryByLabelText('Post comments', { selector: 'section' });
        expect(commentsSection).toBeInTheDocument();
    });

    it('render comments section when click on comments stats', async () => {
        mock({
            path: `/api/posts/${post.id}/comments?page=1`,
            data: CommentsFirstPageJson,
        });

        renderWithDefaultData(<Post {...post} type="OWN" />);

        const commentStats = screen.getByText(`${post.comments_count} comments`);
        await user.click(commentStats);

        const commentsSection = screen.queryByLabelText('Post comments', { selector: 'section' });
        expect(commentsSection).toBeInTheDocument();
    });

    it('render loaders before comments section', async () => {
        mock({
            path: `/api/posts/${post.id}/comments?page=1`,
            data: CommentsFirstPageJson,
        });

        renderWithDefaultData(<Post {...post} type="OWN" />);

        const commentStats = screen.getByText(`${post.comments_count} comments`);
        await user.click(commentStats);

        const commentsSection = await screen.findByLabelText('Post comments', { selector: 'section' });
        expect(commentsSection).toBeInTheDocument();
    });
});
