import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import RootUserJson from '@mocks/user/root.json';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import { screen } from '@testing-library/react';
import { mock } from '@libs/nock';
import { Board } from '@components/pages/profile/board/Board';

describe('Board component', () => {
    beforeEach(() => {
        mock('/api/user', 200, RootUserJson);
        mock('/api/posts/self?page=1', 200, PostsFirstPageJson);
    });

    it('render CreatePost, Switcher and List of posts', async () => {
        renderWithDefaultData(<Board />);

        const fakeForm = await screen.findByText("What's on your mind, Root?");
        const switcher = screen.getByLabelText('Change list of posts');
        const postsList = await screen.findByTestId('board-posts');

        expect(fakeForm).toBeInTheDocument();
        expect(switcher).toBeInTheDocument();
        expect(postsList).toBeInTheDocument();
    });
});
