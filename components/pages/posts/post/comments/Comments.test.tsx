import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { screen, waitFor } from '@testing-library/react';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import CommentsFirstPageJson from '@mocks/posts/comments/firstPage.json';
import CommentsSecondPageJson from '@mocks/posts/comments/secondPage.json';
import CommentsEmptyPageJson from '@mocks/posts/comments/empty.json';
import RootUserJson from '@mocks/user/root.json';
import { mock } from '@libs/nock';
import { Comments } from '@components/pages/posts/post/comments/Comments';
import userEvent from '@testing-library/user-event';

describe('Comments component', () => {
    const user = userEvent.setup();
    const post = PostsFirstPageJson[4];

    beforeEach(() => {
        mock('/api/user', 200, RootUserJson);
    });

    it('show loaders on initial loading', () => {
        mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsFirstPageJson);

        renderWithDefaultData(<Comments postId={post.id} />);

        const loaders = screen.getByTestId('postsCommentsList-loading_loader');

        expect(loaders).toBeInTheDocument();
    });

    it('load 10 comments', async () => {
        mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsFirstPageJson);

        renderWithDefaultData(<Comments postId={post.id} />);

        const firstComment = await screen.findByText(CommentsFirstPageJson[0].content);
        const tenthComment = await screen.findByText(CommentsFirstPageJson[9].content);

        expect(firstComment).toBeInTheDocument();
        expect(tenthComment).toBeInTheDocument();
    });

    it('can fetch 10 more comments when click on button', async () => {
        mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsFirstPageJson);

        renderWithDefaultData(<Comments postId={post.id} />);

        mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsFirstPageJson);
        mock(`/api/posts/${post.id}/comments?page=2`, 200, CommentsSecondPageJson);

        const fetchButton = await screen.findByLabelText('Load more comments');
        await user.click(fetchButton);

        const firstComment = await screen.findByText(CommentsFirstPageJson[0].content);
        const tenthComment = await screen.findByText(CommentsFirstPageJson[9].content);
        const eleventhComment = await screen.findByText(CommentsSecondPageJson[0].content);
        const twentythComment = await screen.findByText(CommentsSecondPageJson[9].content);

        expect(firstComment).toBeInTheDocument();
        expect(tenthComment).toBeInTheDocument();
        expect(eleventhComment).toBeInTheDocument();
        expect(twentythComment).toBeInTheDocument();
    });

    it('show loaders when 10 more user is fetching', async () => {
        mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsFirstPageJson);

        renderWithDefaultData(<Comments postId={post.id} />);

        mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsFirstPageJson);
        mock(`/api/posts/${post.id}/comments?page=2`, 200, CommentsSecondPageJson);

        const fetchButton = await screen.findByLabelText('Load more comments');
        await user.click(fetchButton);

        const loaders = screen.getByTestId('postsCommentsList-fetching_loader');

        expect(loaders).toBeInTheDocument();
    });

    it('show ApiError component when api return error', async () => {
        mock(`/api/posts/${post.id}/comments?page=1`, 500);

        renderWithDefaultData(<Comments postId={post.id} />);

        const apiErrorComponent = await screen.findByText('Something went wrong');

        expect(apiErrorComponent).toBeInTheDocument();
    });

    it('not show LoadMore button when post has no comments', async () => {
        mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsEmptyPageJson);

        renderWithDefaultData(<Comments postId={post.id} />);

        await waitFor(() => {
            const fetchButton = screen.queryByLabelText('Load more comments');

            expect(fetchButton).not.toBeInTheDocument();
        });
    });

    it('not show LoadMore button when user fetch all posts', async () => {
        mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsFirstPageJson);

        renderWithDefaultData(<Comments postId={post.id} />);

        mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsFirstPageJson);
        mock(`/api/posts/${post.id}/comments?page=2`, 200, CommentsSecondPageJson);

        const fetchButton = await screen.findByLabelText('Load more comments');
        await user.click(fetchButton);

        mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsFirstPageJson);
        mock(`/api/posts/${post.id}/comments?page=2`, 200, CommentsSecondPageJson);
        mock(`/api/posts/${post.id}/comments?page=3`, 200, CommentsEmptyPageJson);

        await user.click(fetchButton);

        await waitFor(() => {
            const fetchButton = screen.queryByLabelText('Load more comments');

            expect(fetchButton).not.toBeInTheDocument();
        });
    });
});
