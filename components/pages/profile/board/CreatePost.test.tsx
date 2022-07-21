import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import RootUserJson from '@mocks/user/root.json';
import { screen } from '@testing-library/react';
import { CreatePost } from '@components/pages/profile/board/CreatePost';
import { mock } from '@libs/nock';

describe('CreatePost component', () => {
    beforeEach(() => {
        mock('/api/user', 200, RootUserJson);
    });

    it('component render fake form', async () => {
        renderWithDefaultData(<CreatePost />);

        const switcher = await screen.findByText("What's on your mind, Root?");

        expect(switcher).toBeInTheDocument();
    });
});
