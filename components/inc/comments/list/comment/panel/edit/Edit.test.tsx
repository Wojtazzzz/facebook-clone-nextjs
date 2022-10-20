import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import userEvent from '@testing-library/user-event';
import { Edit } from './Edit';

describe('Edit button tests', () => {
    const user = userEvent.setup();
    const mockToggleEditMode = jest.fn();

    it('show "Edit" title when edit mode is inactive', () => {
        renderWithDefaultData(<Edit isEditModeActive={false} toggleEditMode={mockToggleEditMode} />);

        const editTitle = screen.getByText('Edit');
        expect(editTitle).toBeInTheDocument();

        const closeTitle = screen.queryByText('Close');
        expect(closeTitle).not.toBeInTheDocument();
    });

    it('show "Close" title when edit mode is active', () => {
        renderWithDefaultData(<Edit isEditModeActive={true} toggleEditMode={mockToggleEditMode} />);

        const editTitle = screen.queryByText('Edit');
        expect(editTitle).not.toBeInTheDocument();

        const closeTitle = screen.getByText('Close');
        expect(closeTitle).toBeInTheDocument();
    });

    it('execute toggle edit mode function when click', async () => {
        renderWithDefaultData(<Edit isEditModeActive={false} toggleEditMode={mockToggleEditMode} />);

        const button = screen.getByLabelText('Edit');
        await user.click(button);

        expect(mockToggleEditMode).toBeCalledTimes(1);
    });
});
