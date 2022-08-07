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
import nock from 'nock';

describe('Comments component', () => {
    const user = userEvent.setup();
    const post = PostsFirstPageJson.data[0];
    const commentsFirstPage = CommentsFirstPageJson.data;
    const commentsSecondPage = CommentsSecondPageJson.data;

    beforeEach(() => {
        mock('/api/user', 200, RootUserJson);
    });

    afterEach(() => {
        nock.cleanAll();
    });

    // it('render loaders on initial loading', () => {
    //     mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsFirstPageJson);

    //     renderWithDefaultData(<Comments postId={post.id} />);

    //     const loaders = screen.getByTestId('postsCommentsList-loading_loader');

    //     expect(loaders).toBeInTheDocument();
    // });

    // it('load and render 10 comments', async () => {
    //     mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsFirstPageJson);
    //     mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsFirstPageJson);

    //     renderWithDefaultData(<Comments postId={post.id} />);

    //     const firstComment = await screen.findByText(commentsFirstPage[0].content);
    //     const tenthComment = await screen.findByText(commentsFirstPage[9].content);

    //     expect(firstComment).toBeInTheDocument();
    //     expect(tenthComment).toBeInTheDocument();
    // });

    // it('fetch 10 more comments when click on button', async () => {
    //     mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsFirstPageJson);

    //     renderWithDefaultData(<Comments postId={post.id} />);

    //     mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsFirstPageJson);
    //     mock(`/api/posts/${post.id}/comments?page=2`, 200, CommentsSecondPageJson);

    //     const fetchButton = await screen.findByLabelText('Load more comments');
    //     await user.click(fetchButton);

    //     const firstComment = await screen.findByText(commentsFirstPage[0].content);
    //     const tenthComment = await screen.findByText(commentsFirstPage[9].content);
    //     const eleventhComment = await screen.findByText(commentsSecondPage[0].content);
    //     const twentythComment = await screen.findByText(commentsSecondPage[9].content);

    //     expect(firstComment).toBeInTheDocument();
    //     expect(tenthComment).toBeInTheDocument();
    //     expect(eleventhComment).toBeInTheDocument();
    //     expect(twentythComment).toBeInTheDocument();
    // });

    // it('render loaders when 10 more user is fetching', async () => {
    //     mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsFirstPageJson);

    //     renderWithDefaultData(<Comments postId={post.id} />);

    //     mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsFirstPageJson);
    //     mock(`/api/posts/${post.id}/comments?page=2`, 200, CommentsSecondPageJson);

    //     const fetchButton = await screen.findByLabelText('Load more comments');
    //     await user.click(fetchButton);

    //     const loaders = await screen.findByTestId('postsCommentsList-fetching_loader');

    //     expect(loaders).toBeInTheDocument();
    // });

    // it('render ApiError component when api return error', async () => {
    //     mock(`/api/posts/${post.id}/comments?page=1`, 500);

    //     renderWithDefaultData(<Comments postId={post.id} />);

    //     const apiErrorComponent = await screen.findByText('Something went wrong');

    //     expect(apiErrorComponent).toBeInTheDocument();
    // });

    // it('not render LoadMore button when post has no comments', async () => {
    //     mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsEmptyPageJson);

    //     renderWithDefaultData(<Comments postId={post.id} />);

    //     const fetchButton = screen.queryByLabelText('Load more comments');

    //     expect(fetchButton).not.toBeInTheDocument();
    // });

    it('not render LoadMore button when user fetch all posts', async () => {
        mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsFirstPageJson);

        renderWithDefaultData(<Comments postId={post.id} />);

        mock(`/api/posts/${post.id}/comments?page=1`, 200, CommentsFirstPageJson);
        mock(`/api/posts/${post.id}/comments?page=2`, 200, CommentsSecondPageJson);

        const fetchButton = await screen.findByLabelText('Load more comments');
        await user.click(fetchButton);

        await waitFor(() => {
            expect(fetchButton).not.toBeInTheDocument();
        });
    });
});
