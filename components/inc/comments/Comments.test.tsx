import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen, waitFor } from '@testing-library/react';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import CommentsFirstPageJson from '@mocks/posts/comments/firstPage.json';
import CommentsSecondPageJson from '@mocks/posts/comments/secondPage.json';
import CommentsEmptyPageJson from '@mocks/posts/comments/empty.json';
import RootUserJson from '@mocks/user/root.json';
import { mock } from '@utils/nock';
import userEvent from '@testing-library/user-event';
import { Comments } from './Comments';

describe('Comments component', () => {
    const user = userEvent.setup();
    const post = PostsFirstPageJson.data[0];
    const commentsFirstPage = CommentsFirstPageJson.data;
    const commentsSecondPage = CommentsSecondPageJson.data;

    beforeEach(() => {
        mock({
            path: '/api/user',
            data: RootUserJson,
            times: 2,
        });
    });

    it('render loaders on initial loading', () => {
        mock({
            path: `/api/posts/${post.id}/comments?page=1`,
            data: CommentsFirstPageJson,
        });

        renderWithDefaultData(<Comments commenting={post.commenting} authorName={post.author.name} postId={post.id} />);

        const loaders = screen.getByTestId('postsCommentsList-loading_loader');

        expect(loaders).toBeInTheDocument();
    });

    it('load and render 10 comments', async () => {
        mock({
            path: `/api/posts/${post.id}/comments?page=1`,
            data: CommentsFirstPageJson,
        });

        renderWithDefaultData(<Comments commenting={post.commenting} authorName={post.author.name} postId={post.id} />);

        const firstComment = await screen.findByText(commentsFirstPage[0].content);
        const tenthComment = await screen.findByText(commentsFirstPage[9].content);

        expect(firstComment).toBeInTheDocument();
        expect(tenthComment).toBeInTheDocument();
    });

    it('render ApiError component when api return error', async () => {
        mock({
            path: `/api/posts/${post.id}/comments?page=1`,
            status: 500,
        });

        renderWithDefaultData(<Comments commenting={post.commenting} authorName={post.author.name} postId={post.id} />);

        const apiErrorComponent = await screen.findByText('Something went wrong');

        await waitFor(() => {
            expect(apiErrorComponent).toBeInTheDocument();
        });
    });

    it('not render LoadMore button when post has no comments', async () => {
        mock({
            path: `/api/posts/${post.id}/comments?page=1`,
            data: CommentsEmptyPageJson,
        });

        renderWithDefaultData(<Comments commenting={post.commenting} authorName={post.author.name} postId={post.id} />);

        const fetchButton = screen.queryByLabelText('Load more comments');

        expect(fetchButton).not.toBeInTheDocument();
    });

    it('render only "comments turned off" when commenting is disabled', () => {
        mock({
            path: `/api/posts/${post.id}/comments?page=1`,
            data: CommentsFirstPageJson,
        });

        renderWithDefaultData(<Comments commenting={false} authorName={post.author.name} postId={post.id} />);

        const text = screen.getByText(`${post.author.name} turned off commenting for this post.`);
        const commentsSection = screen.queryByLabelText('Post comments');

        expect(text).toBeInTheDocument();
        expect(commentsSection).not.toBeInTheDocument();
    });

    beforeEach(() => {
        mock({
            path: `/api/posts/${post.id}/comments?page=2`,
            data: CommentsSecondPageJson,
        });
    });

    it('fetch 10 more comments when click on button', async () => {
        mock({
            path: `/api/posts/${post.id}/comments?page=1`,
            data: CommentsFirstPageJson,
        });

        renderWithDefaultData(<Comments commenting={post.commenting} authorName={post.author.name} postId={post.id} />);

        const fetchButton = await screen.findByLabelText('Load more comments');
        await user.click(fetchButton);

        const firstComment = await screen.findByText(commentsFirstPage[0].content);
        const tenthComment = await screen.findByText(commentsFirstPage[9].content);
        const eleventhComment = await screen.findByText(commentsSecondPage[0].content);
        const twentythComment = await screen.findByText(commentsSecondPage[9].content);

        expect(firstComment).toBeInTheDocument();
        expect(tenthComment).toBeInTheDocument();
        expect(eleventhComment).toBeInTheDocument();
        expect(twentythComment).toBeInTheDocument();
    });

    it('render loaders when more comments are fetching', async () => {
        mock({
            path: `/api/posts/${post.id}/comments?page=1`,
            data: CommentsFirstPageJson,
        });

        renderWithDefaultData(<Comments commenting={post.commenting} authorName={post.author.name} postId={post.id} />);

        const fetchButton = await screen.findByLabelText('Load more comments');

        await user.click(fetchButton);

        const loaders = await screen.findByTestId('postsCommentsList-loading_loader');

        expect(loaders).toBeInTheDocument();
    });

    it('not render LoadMore button when user fetch all posts', async () => {
        mock({
            path: `/api/posts/${post.id}/comments?page=1`,
            data: CommentsFirstPageJson,
        });

        renderWithDefaultData(<Comments commenting={post.commenting} authorName={post.author.name} postId={post.id} />);

        const fetchButton = await screen.findByLabelText('Load more comments');

        await user.click(fetchButton);

        await waitFor(() => {
            expect(fetchButton).not.toBeInTheDocument();
        });
    });
});
