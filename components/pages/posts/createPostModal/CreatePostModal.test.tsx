import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { CreatePostModal } from '@components/pages/posts/createPostModal/CreatePostModal';
import { mock } from '@libs/nock';
import RootUserJson from '@mocks/user/root.json';
import { screen } from '@testing-library/react';

describe('CreatePostModal component', () => {
    beforeEach(() => {
        mock({
            path: '/api/user',
            data: RootUserJson,
        });
    });

    it('render loaders when user not loaded', () => {
        renderWithDefaultData(<CreatePostModal />);

        const loaders = screen.getByTestId('createPostModal-loaders');

        expect(loaders).toBeInTheDocument();
    });

    it('render avatar and text with user name properly', async () => {
        renderWithDefaultData(<CreatePostModal />);

        const avatar = await screen.findByAltText(RootUserJson.name);
        const text = await screen.findByText(`What's on your mind, ${RootUserJson.first_name}?`);

        expect(text).toBeInTheDocument();
        expect(avatar).toBeInTheDocument();
    });
});
