import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { CreatePost } from '@components/pages/posts/create/CreatePost';
import { mock } from '@libs/nock';
import RootUserJson from '@mocks/user/root.json';
import { screen } from '@testing-library/react';

describe('CreatePost component', () => {
    const mockHandleOpenModal = jest.fn();

    beforeEach(() => {
        mock('/api/user', 200, RootUserJson);
    });

    it('render loaders when user not loaded', () => {
        renderWithDefaultData(<CreatePost handleOpenModal={mockHandleOpenModal} />);

        const loaders = screen.getByTestId('createPost-loaders');

        expect(loaders).toBeInTheDocument();
    });

    it('render avatar and text with user name properly', async () => {
        renderWithDefaultData(<CreatePost handleOpenModal={mockHandleOpenModal} />);

        const avatar = await screen.findByAltText(RootUserJson.name);
        const text = await screen.findByText(`What's on your mind, ${RootUserJson.first_name}?`);

        expect(text).toBeInTheDocument();
        expect(avatar).toBeInTheDocument();
    });

    it('execute open modal function on click', async () => {
        renderWithDefaultData(<CreatePost handleOpenModal={mockHandleOpenModal} />);

        const button = await screen.findByText(`What's on your mind, ${RootUserJson.first_name}?`);
        button.click();

        expect(mockHandleOpenModal).toBeCalledTimes(1);
    });
});
