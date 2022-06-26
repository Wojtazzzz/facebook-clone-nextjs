import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { EditAction } from '@components/pages/posts/post/comments/inc/actions/EditAction';
import userEvent from '@testing-library/user-event';

describe('EditAction button', () => {
    const user = userEvent.setup();
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

    it('execute toggle edit mode function when click', async () => {
        renderWithDefaultData(<EditAction isEditModeActive={false} toggleEditMode={mockToggleEditMode} />);

        const button = screen.getByLabelText('Edit');
        await user.click(button);

        expect(mockToggleEditMode).toBeCalledTimes(1);
    });
});
