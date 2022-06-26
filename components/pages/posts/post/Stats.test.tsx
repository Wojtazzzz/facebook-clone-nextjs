import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Stats } from '@components/pages/posts/post/Stats';
import userEvent from '@testing-library/user-event';

describe('Stats component', () => {
    const user = userEvent.setup();
    const mockHandleToggleIsCommentsActive = jest.fn();

    it('display properly like number', () => {
        renderWithDefaultData(
            <Stats likesCount={20} commentsCount={7} handleToggleIsCommentsActive={mockHandleToggleIsCommentsActive} />
        );

        const likesText = screen.getByText('20');

        expect(likesText).toBeInTheDocument();
    });

    it('display properly comments number', () => {
        renderWithDefaultData(
            <Stats likesCount={20} commentsCount={7} handleToggleIsCommentsActive={mockHandleToggleIsCommentsActive} />
        );

        const commentsText = screen.getByText('7 comments');

        expect(commentsText).toBeInTheDocument();
    });

    it('execute show comments function on click on comments amount', async () => {
        renderWithDefaultData(
            <Stats likesCount={20} commentsCount={7} handleToggleIsCommentsActive={mockHandleToggleIsCommentsActive} />
        );

        const commentsText = screen.getByText('7 comments');
        await user.click(commentsText);

        expect(mockHandleToggleIsCommentsActive).toBeCalledTimes(1);
    });

    it('not render when comments and likes amount equals 0', () => {
        renderWithDefaultData(
            <Stats likesCount={0} commentsCount={0} handleToggleIsCommentsActive={mockHandleToggleIsCommentsActive} />
        );

        const commentsText = screen.queryByText('0 comments');

        expect(commentsText).not.toBeInTheDocument();
    });
});
