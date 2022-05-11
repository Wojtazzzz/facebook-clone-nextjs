import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { EditAction } from '@components/pages/posts/post/comments/inc/actions/EditAction';

describe('EditAction button', () => {
    const mockToggleEditMode = jest.fn();

    it('show "Edit" title when edit mode is inactive', () => {
        renderWithDefaultData(<EditAction isEditModeActive={false} toggleEditMode={mockToggleEditMode} />);

        const editTitle = screen.getByText('Edit');
        expect(editTitle).toBeInTheDocument();

        const closeTitle = screen.queryByText('Close');
        expect(closeTitle).not.toBeInTheDocument();
    });

    it('show "Close" title when edit mode is active', () => {
        renderWithDefaultData(<EditAction isEditModeActive={true} toggleEditMode={mockToggleEditMode} />);

        const editTitle = screen.queryByText('Edit');
        expect(editTitle).not.toBeInTheDocument();

        const closeTitle = screen.getByText('Close');
        expect(closeTitle).toBeInTheDocument();
    });

    it('execute toggle edit mode function when click', () => {
        renderWithDefaultData(<EditAction isEditModeActive={false} toggleEditMode={mockToggleEditMode} />);

        const button = screen.getByLabelText('Edit');
        button.click();

        expect(mockToggleEditMode).toBeCalledTimes(1);
    });
});
