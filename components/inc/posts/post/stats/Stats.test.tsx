import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import userEvent from '@testing-library/user-event';
import { Stats } from './Stats';

describe('Stats component', () => {
    const user = userEvent.setup();
    const mockToggleCommentsActive = jest.fn();

    it('display properly like number', () => {
        renderWithDefaultData(
            <Stats postId={1} likesCount={20} commentsCount={0} toggleCommentsActive={mockToggleCommentsActive} />
        );

        const likesText = screen.getByText('20');

        expect(likesText).toBeInTheDocument();
    });

    it('display properly comments number', () => {
        renderWithDefaultData(
            <Stats postId={1} likesCount={0} commentsCount={7} toggleCommentsActive={mockToggleCommentsActive} />
        );

        const commentsText = screen.getByText('7 comments');

        expect(commentsText).toBeInTheDocument();
    });

    it('execute show comments function on click on comments amount', async () => {
        renderWithDefaultData(
            <Stats postId={1} likesCount={0} commentsCount={7} toggleCommentsActive={mockToggleCommentsActive} />
        );

        const commentsText = screen.getByText('7 comments');
        await user.click(commentsText);

        expect(mockToggleCommentsActive).toBeCalledTimes(1);
    });

    it('not render when comments and likes amount equals 0', () => {
        renderWithDefaultData(
            <Stats postId={1} likesCount={0} commentsCount={0} toggleCommentsActive={mockToggleCommentsActive} />
        );

        const commentsText = screen.queryByText('0 comments');

        expect(commentsText).not.toBeInTheDocument();
    });
});
