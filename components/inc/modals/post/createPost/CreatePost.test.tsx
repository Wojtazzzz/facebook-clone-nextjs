import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { CreatePost } from './CreatePost';
import { mock } from '@libs/nock';
import RootUserJson from '@mocks/user/root.json';
import { screen } from '@testing-library/react';

describe('CreatePost component', () => {
    beforeEach(() => {
        mock({
            path: '/api/user',
            data: RootUserJson,
        });
    });

    it('render loaders when user not loaded', () => {
        renderWithDefaultData(<CreatePost />);

        const loaders = screen.getByTestId('createPost-loader');

        expect(loaders).toBeInTheDocument();
    });

    it('render avatar and text with user name properly', async () => {
        renderWithDefaultData(<CreatePost />);

        const avatar = await screen.findByAltText(RootUserJson.name);
        const text = await screen.findByText(`What's on your mind, ${RootUserJson.first_name}?`);

        expect(text).toBeInTheDocument();
        expect(avatar).toBeInTheDocument();
    });
});
