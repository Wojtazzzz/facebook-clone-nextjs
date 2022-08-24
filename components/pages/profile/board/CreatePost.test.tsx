import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import RootUserJson from '@mocks/user/root.json';
import { screen } from '@testing-library/react';
import { CreatePost } from '@components/pages/profile/board/CreatePost';
import { mock } from '@libs/nock';

describe('CreatePost component', () => {
    beforeEach(() => {
        mock({
            path: '/api/user',
            data: RootUserJson,
        });
    });

    it('render fake form', async () => {
        renderWithDefaultData(<CreatePost />);

        const switcher = await screen.findByText(`What's on your mind, ${RootUserJson.first_name}?`);

        expect(switcher).toBeInTheDocument();
    });
});
