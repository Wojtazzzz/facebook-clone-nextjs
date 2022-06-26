import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Posts } from '@components/pages/posts/Posts';
import RootUserJson from '@mocks/user/root.json';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import { screen } from '@testing-library/react';
import { mock } from '@libs/nock';
import userEvent from '@testing-library/user-event';

describe('Posts component', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        mock('/api/user', 200, RootUserJson);
        mock('/api/posts?page=1', 200, PostsFirstPageJson);
    });

    it('can open modal', async () => {
        renderWithDefaultData(<Posts />);

        const openModalButton = await screen.findByText(`What's on your mind, ${RootUserJson.first_name}?`);
        await user.click(openModalButton);

        const modal = await screen.findByLabelText('Create post modal');
        expect(modal).toBeVisible();
    });

    it('can close modal', async () => {
        renderWithDefaultData(<Posts />);

        const openModalButton = await screen.findByText(`What's on your mind, ${RootUserJson.first_name}?`);
        await user.click(openModalButton);

        const modal = await screen.findByLabelText('Create post modal');

        const closeModalButton = screen.getByLabelText('Close modal');
        await user.click(closeModalButton);

        expect(modal).not.toBeVisible();
    });
});
