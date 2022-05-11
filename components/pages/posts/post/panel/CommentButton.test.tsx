import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { CommentButton } from '@components/pages/posts/post/panel/CommentButton';
import { screen } from '@testing-library/react';

describe('CommentButton component', () => {
    const mockHandleToggleIsCommentsActive = jest.fn();

    it('can execute show comments function when click on button', () => {
        renderWithDefaultData(<CommentButton handleToggleIsCommentsActive={mockHandleToggleIsCommentsActive} />);

        const button = screen.getByLabelText('Comment');
        button.click();

        expect(mockHandleToggleIsCommentsActive).toBeCalledTimes(1);
    });
});
