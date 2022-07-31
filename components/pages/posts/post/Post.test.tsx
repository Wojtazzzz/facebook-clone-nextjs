import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { Post } from '@components/pages/posts/post/Post';
import RootUserJson from '@mocks/user/root.json';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import CommentsFirstPageJson from '@mocks/posts/comments/firstPage.json';
import userEvent from '@testing-library/user-event';
import { mock } from '@libs/nock';

describe('Post component', () => {
    const mockReloadPosts = jest.fn();
    const user = userEvent.setup();
    const post = PostsFirstPageJson[0];

    beforeEach(() => {
        mock('/api/user', 200, RootUserJson);
    });

    it('render like, comment and share buttons', () => {
        renderWithDefaultData(<Post {...post} type="OWN" reloadPosts={mockReloadPosts} />);

        const likeButton = screen.getByLabelText('Like');
        const commentButton = screen.getByLabelText('Comment');
        const shareButton = screen.getByLabelText('Share');

        expect(likeButton).toBeInTheDocument();
        expect(commentButton).toBeInTheDocument();
        expect(shareButton).toBeInTheDocument();
    });

    it('not show comments section by default', async () => {
        renderWithDefaultData(<Post {...post} type="OWN" reloadPosts={mockReloadPosts} />);

        const commentsSection = screen.queryByLabelText('Post comments', { selector: 'section' });

        expect(commentsSection).not.toBeInTheDocument();
    });

    it('show comments section when click on button', async () => {
        mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsFirstPageJson);

        renderWithDefaultData(<Post {...post} type="OWN" reloadPosts={mockReloadPosts} />);

        const commentButton = screen.getByLabelText('Comment');
        await user.click(commentButton);

        const commentsSection = screen.queryByLabelText('Post comments', { selector: 'section' });
        expect(commentsSection).toBeInTheDocument();
    });

    it('show comments section when click on comments stats', async () => {
        mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsFirstPageJson);

        renderWithDefaultData(<Post {...post} type="OWN" reloadPosts={mockReloadPosts} />);

        const commentStats = screen.getByText(`${post.comments_count} comments`);
        await user.click(commentStats);

        const commentsSection = screen.queryByLabelText('Post comments', { selector: 'section' });
        expect(commentsSection).toBeInTheDocument();
    });

    it('show loaders before comments section', async () => {
        mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsFirstPageJson);

        renderWithDefaultData(<Post {...post} type="OWN" reloadPosts={mockReloadPosts} />);

        const commentStats = screen.getByText(`${post.comments_count} comments`);
        await user.click(commentStats);

        const commentsSection = await screen.findByLabelText('Post comments', { selector: 'section' });
        expect(commentsSection).toBeInTheDocument();
    });
});
