import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import RootUserJson from '@mocks/user/root.json';
import SelfPostsFirstPageJson from '@mocks/posts/selfProfileFirstPage.json';
import FriendPostsFirstPageJson from '@mocks/posts/friendProfileFirstPage.json';
import { screen, waitFor } from '@testing-library/react';
import { mock } from '@libs/nock';
import { Board } from '@components/pages/profile/board/Board';

describe('Board component', () => {
    beforeEach(() => {
        mock('/api/user', 200, RootUserJson);
    });

    it('render CreatePost, Switcher and list of posts if profile is self profile', async () => {
        mock(`/api/users/${RootUserJson.id}/posts?page=1`, 200, SelfPostsFirstPageJson);

        renderWithDefaultData(<Board userId={RootUserJson.id} />);

        const fakeForm = await screen.findByText(`What's on your mind, ${RootUserJson.first_name}?`);
        expect(fakeForm).toBeInTheDocument();

        const switcher = await screen.findByLabelText('Change list of posts');
        const postsList = await screen.findByTestId('board-posts');

        expect(switcher).toBeInTheDocument();
        expect(postsList).toBeInTheDocument();
    });

    it('render only list of posts if profile is not self profile', async () => {
        mock('/api/users/2/posts?page=1', 200, FriendPostsFirstPageJson);

        renderWithDefaultData(<Board userId={2} />);

        const fakeForm = screen.queryByText(`What's on your mind, ${RootUserJson.first_name}?`);
        const switcher = screen.queryByLabelText('Change list of posts');
        const postsList = await screen.findByTestId('board-posts');

        expect(fakeForm).not.toBeInTheDocument();
        expect(switcher).not.toBeInTheDocument();
        expect(postsList).toBeInTheDocument();
    });
});
