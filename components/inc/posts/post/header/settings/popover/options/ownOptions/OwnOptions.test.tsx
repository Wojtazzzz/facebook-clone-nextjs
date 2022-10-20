import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { OwnOptions } from './OwnOptions';
import { getPostsQK } from '@utils/queryKeys';

describe('OwnOptions component', () => {
    const queryKey = getPostsQK({ type: 'all' });

    it('render delete option', () => {
        const mockOpenUpdateModal = jest.fn();

        renderWithDefaultData(
            <OwnOptions postId={1} commenting={true} queryKey={queryKey} openUpdateModal={mockOpenUpdateModal} />
        );

        const deleteOption = screen.getByLabelText('Delete');

        expect(deleteOption).toBeInTheDocument();
    });

    it('render turnOffCommenting option when commenting is active', () => {
        const mockOpenUpdateModal = jest.fn();

        renderWithDefaultData(
            <OwnOptions postId={1} commenting={true} queryKey={queryKey} openUpdateModal={mockOpenUpdateModal} />
        );

        const turnOffCommentingOption = screen.getByLabelText('Turn off comments');
        const turnOnCommentingOption = screen.queryByLabelText('Turn on comments');

        expect(turnOffCommentingOption).toBeInTheDocument();
        expect(turnOnCommentingOption).not.toBeInTheDocument();
    });

    it('render turnOnCommenting option when commenting is inactive', () => {
        const mockOpenUpdateModal = jest.fn();

        renderWithDefaultData(
            <OwnOptions postId={1} commenting={false} queryKey={queryKey} openUpdateModal={mockOpenUpdateModal} />
        );

        const turnOnCommentingOption = screen.getByLabelText('Turn on comments');
        const turnOffCommentingOption = screen.queryByLabelText('Turn off comments');

        expect(turnOnCommentingOption).toBeInTheDocument();
        expect(turnOffCommentingOption).not.toBeInTheDocument();
    });
});
