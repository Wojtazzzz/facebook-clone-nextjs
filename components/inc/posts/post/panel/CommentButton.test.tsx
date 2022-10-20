import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { CommentButton } from './CommentButton';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('CommentButton component tests', () => {
    const user = userEvent.setup();

    it('can execute show comments function when click on button', async () => {
        const mockToggleCommentsActive = jest.fn();

        renderWithDefaultData(<CommentButton toggleCommentsActive={mockToggleCommentsActive} />);

        const button = screen.getByLabelText('Comment');
        await user.click(button);

        expect(mockToggleCommentsActive).toBeCalledTimes(1);
    });
});
