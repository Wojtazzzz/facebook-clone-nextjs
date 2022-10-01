import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import RootUserJson from '@mocks/user/root.json';
import JohnDoeUserJson from '@mocks/user/johnDoe.json';
import SelfPostsFirstPageJson from '@mocks/posts/selfProfileFirstPage.json';
import EmptyPostsPageJson from '@mocks/posts/empty.json';
import FriendPostsFirstPageJson from '@mocks/posts/friendProfileFirstPage.json';
import { screen } from '@testing-library/react';
import { mock } from '@utils/nock';
import userEvent from '@testing-library/user-event';
import { Board } from './Board';

describe('Board component', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        mock({
            path: '/api/user',
            data: RootUserJson,
        });
    });

    it('render CreatePost, Switcher and list of posts if profile is self profile', async () => {
        mock({
            path: `/api/users/${RootUserJson.id}/posts?page=1`,
            data: SelfPostsFirstPageJson,
        });

        renderWithDefaultData(<Board user={RootUserJson} />);

        const fakeForm = await screen.findByText(`What's on your mind, ${RootUserJson.first_name}?`);
        expect(fakeForm).toBeInTheDocument();

        const switcher = await screen.findByLabelText('Change list of posts');
        const postsList = await screen.findByTestId('posts-list');

        expect(switcher).toBeInTheDocument();
        expect(postsList).toBeInTheDocument();
    });

    it('render only list of posts if profile is not self profile', async () => {
        mock({
            path: `/api/users/${JohnDoeUserJson.id}/posts?page=1`,
            data: FriendPostsFirstPageJson,
        });

        renderWithDefaultData(<Board user={JohnDoeUserJson} />);

        const fakeForm = screen.queryByText(`What's on your mind, ${RootUserJson.first_name}?`);
        const switcher = screen.queryByLabelText('Change list of posts');
        const postsList = await screen.findByTestId('posts-list');

        expect(fakeForm).not.toBeInTheDocument();
        expect(switcher).not.toBeInTheDocument();
        expect(postsList).toBeInTheDocument();
    });

    it('render BornAt component instead of EmptyList on own board when api return empty data', async () => {
        mock({
            path: `/api/users/${RootUserJson.id}/posts?page=1`,
            data: EmptyPostsPageJson,
        });

        renderWithDefaultData(<Board user={RootUserJson} />);

        const bornAt = await screen.findByText(`Born on ${RootUserJson.born_at}`);
        const emptyList = screen.queryByText(`No posts, add some friends!`);

        expect(bornAt).toBeInTheDocument();
        expect(emptyList).not.toBeInTheDocument();
    });

    it('render BornAt component instead of EmptyList on somebodys board when api return empty data', async () => {
        mock({
            path: `/api/users/${JohnDoeUserJson.id}/posts?page=1`,
            data: EmptyPostsPageJson,
        });

        renderWithDefaultData(<Board user={JohnDoeUserJson} />);

        const bornAt = await screen.findByText(`Born on ${JohnDoeUserJson.born_at}`);
        const emptyList = screen.queryByText(`No posts, add some friends!`);

        expect(bornAt).toBeInTheDocument();
        expect(emptyList).not.toBeInTheDocument();
    });

    it('render EmptyList component instead of BornAt on hidden posts list', async () => {
        mock({
            path: `/api/users/${RootUserJson.id}/posts?page=1`,
            data: EmptyPostsPageJson,
        });

        mock({
            path: '/api/hidden/posts?page=1',
            data: EmptyPostsPageJson,
        });

        renderWithDefaultData(<Board user={RootUserJson} />);

        const listSwitcher = await screen.findByLabelText('Change list of posts');
        await user.selectOptions(listSwitcher, 'hidden');

        const emptyList = await screen.findByText(`No posts, add some friends!`);
        const bornAt = screen.queryByText(`Born on ${RootUserJson.born_at}`);

        expect(emptyList).toBeInTheDocument();
        expect(bornAt).not.toBeInTheDocument();
    });

    it('render EmptyList component instead of BornAt on saved posts list', async () => {
        mock({
            path: `/api/users/${RootUserJson.id}/posts?page=1`,
            data: EmptyPostsPageJson,
        });

        mock({
            path: '/api/saved/posts?page=1',
            data: EmptyPostsPageJson,
        });

        renderWithDefaultData(<Board user={RootUserJson} />);

        const listSwitcher = await screen.findByLabelText('Change list of posts');
        await user.selectOptions(listSwitcher, 'saved');

        const emptyList = await screen.findByText(`No posts, add some friends!`);
        const bornAt = screen.queryByText(`Born on ${RootUserJson.born_at}`);

        expect(emptyList).toBeInTheDocument();
        expect(bornAt).not.toBeInTheDocument();
    });
});
