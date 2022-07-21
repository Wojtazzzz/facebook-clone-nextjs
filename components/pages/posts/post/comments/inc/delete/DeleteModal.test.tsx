import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { DeleteModal } from '@components/pages/posts/post/comments/inc/delete/DeleteModal';
import { screen, waitFor } from '@testing-library/react';
import { mock } from '@libs/nock';
import CommentsFirstPageJson from '@mocks/posts/comments/firstPage.json';
import userEvent from '@testing-library/user-event';

describe('DeleteModal component', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        mock('/api/posts/1/comments?page=1', 200, CommentsFirstPageJson);
        mock('/api/posts/1/comments?page=1', 200, CommentsFirstPageJson);
    });

    it('execute close modal function on click on close cross (;times)', async () => {
        const mockCloseModal = jest.fn();

        renderWithDefaultData(<DeleteModal isOpen={true} postId={1} commentId={1} closeModal={mockCloseModal} />);

        const closeButton = screen.getByLabelText('Close modal');
        await user.click(closeButton);

        expect(mockCloseModal).toBeCalledTimes(1);
    });

    it('execute close modal function on click on "NO" button', async () => {
        const mockCloseModal = jest.fn();

        renderWithDefaultData(<DeleteModal isOpen={true} postId={1} commentId={1} closeModal={mockCloseModal} />);

        const noButton = screen.getByLabelText("Don't delete comment");
        await user.click(noButton);

        expect(mockCloseModal).toBeCalledTimes(1);
    });

    it('show properly modal title', () => {
        const mockCloseModal = jest.fn();

        renderWithDefaultData(<DeleteModal isOpen={true} postId={1} commentId={1} closeModal={mockCloseModal} />);

        const title = screen.getByText('Are you sure you want to delete that comment?');

        expect(title).toBeInTheDocument();
    });

    it('show ApiError component when api return error', async () => {
        mock('/api/posts/1/comments/1', 500, {}, 'delete');

        const mockCloseModal = jest.fn();

        renderWithDefaultData(<DeleteModal isOpen={true} postId={1} commentId={1} closeModal={mockCloseModal} />);

        const yesButton = screen.getByLabelText('Delete comment');
        await user.click(yesButton);

        const apiError = await screen.findByText('Something went wrong');

        expect(apiError).toBeInTheDocument();
    });

    it('show loaders when called delete request', async () => {
        mock('/api/posts/1/comments/1', 204, {}, 'delete');

        const mockCloseModal = jest.fn();

        renderWithDefaultData(<DeleteModal isOpen={true} postId={1} commentId={1} closeModal={mockCloseModal} />);

        const yesButton = screen.getByLabelText('Delete comment');
        await user.click(yesButton);

        const loaders = await screen.findByTestId('deleteModal-loading');

        expect(loaders).toBeInTheDocument();
    });
});
