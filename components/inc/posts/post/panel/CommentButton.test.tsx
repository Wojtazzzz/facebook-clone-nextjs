import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { CommentButton } from './CommentButton';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('CommentButton component', () => {
    const user = userEvent.setup();
    const mockHandleToggleIsCommentsActive = jest.fn();

    it('can execute show comments function when click on button', async () => {
        renderWithDefaultData(<CommentButton handleToggleIsCommentsActive={mockHandleToggleIsCommentsActive} />);

        const button = screen.getByLabelText('Comment');
        await user.click(button);

        expect(mockHandleToggleIsCommentsActive).toBeCalledTimes(1);
    });
});
