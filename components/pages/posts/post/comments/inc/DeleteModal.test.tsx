import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { DeleteModal } from '@components/pages/posts/post/comments/inc/DeleteModal';
import { screen, waitFor } from '@testing-library/react';
import { mock } from '@libs/nock';
import CommentsFirstPageJson from '@mocks/posts/comments/firstPage.json';

describe('DeleteModal component', () => {
    beforeEach(() => {
        mock('/api/posts/1/comments?page=1', 200, CommentsFirstPageJson);
        mock('/api/posts/1/comments?page=1', 200, CommentsFirstPageJson);
    });

    it('execute close modal function on click on close cross (;times)', () => {
        const mockCloseModal = jest.fn();

        renderWithDefaultData(<DeleteModal postId={1} commentId={1} closeModal={mockCloseModal} />);

        const closeButton = screen.getByLabelText('Close modal');
        closeButton.click();

        expect(mockCloseModal).toBeCalledTimes(1);
    });

    it('execute close modal function on click on "NO" button', () => {
        const mockCloseModal = jest.fn();

        renderWithDefaultData(<DeleteModal postId={1} commentId={1} closeModal={mockCloseModal} />);

        const noButton = screen.getByLabelText("Don't delete comment");
        noButton.click();

        expect(mockCloseModal).toBeCalledTimes(1);
    });

    it('show properly modal title', () => {
        const mockCloseModal = jest.fn();

        renderWithDefaultData(<DeleteModal postId={1} commentId={1} closeModal={mockCloseModal} />);

        const title = screen.getByText('Are you sure you want to delete the comment?');

        expect(title).toBeInTheDocument();
    });

    it('show properly modal title', () => {
        const mockCloseModal = jest.fn();

        renderWithDefaultData(<DeleteModal postId={1} commentId={1} closeModal={mockCloseModal} />);

        const title = screen.getByText('Are you sure you want to delete the comment?');

        expect(title).toBeInTheDocument();
    });

    it('show loaders when called delete request', () => {
        const mockCloseModal = jest.fn();

        renderWithDefaultData(<DeleteModal postId={1} commentId={1} closeModal={mockCloseModal} />);

        const yesButton = screen.getByLabelText('Delete comment');
        yesButton.click();

        const loaders = screen.getByTestId('deleteModal-loading');

        expect(loaders).toBeInTheDocument();
    });

    it('call close modal mock when api return success', async () => {
        mock('/api/posts/1/comments/1', 204, {}, 'delete');

        const mockCloseModal = jest.fn();

        renderWithDefaultData(<DeleteModal postId={1} commentId={1} closeModal={mockCloseModal} />);

        const yesButton = screen.getByLabelText('Delete comment');
        yesButton.click();

        await waitFor(() => {
            expect(mockCloseModal).toBeCalledTimes(1);
        });
    });

    it('show ApiError component when api return error', async () => {
        mock('/api/posts/1/comments/1', 500, {}, 'delete');

        const mockCloseModal = jest.fn();

        renderWithDefaultData(<DeleteModal postId={1} commentId={1} closeModal={mockCloseModal} />);

        const yesButton = screen.getByLabelText('Delete comment');
        yesButton.click();

        const apiError = await screen.findByText('Something went wrong');

        expect(apiError).toBeInTheDocument();
    });
});
