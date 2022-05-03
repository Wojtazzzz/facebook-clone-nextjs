import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Posts } from '@components/pages/posts/Posts';
import RootUserJson from '@mocks/user/root.json';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import PostsSecondPageJson from '@mocks/posts/secondPage.json';
import PostsEmptyPageJson from '@mocks/posts/empty.json';
import { screen } from '@testing-library/react';
import { mock } from '@libs/nock';

describe('Posts component', () => {
    beforeEach(() => {
        mock('/api/user', 200, RootUserJson);
        mock('/api/posts?page=1', 200, PostsFirstPageJson);
    });

    it('can open and close modal for post creating', async () => {
        renderWithDefaultData(<Posts />);

        const openModalButton = await screen.findByText(`What's on your mind, ${RootUserJson.first_name}?`);
        openModalButton.click();

        const modal = await screen.findByLabelText('Create post modal');
        expect(modal).toBeVisible();

        const closeModalButton = screen.getByLabelText('Close modal');
        closeModalButton.click();

        expect(modal).not.toBeVisible();
    });
});
