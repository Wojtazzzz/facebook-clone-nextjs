import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import userEvent from '@testing-library/user-event';
import { Comments } from './Comments';

describe('Comments component', () => {
    it('display properly count', () => {
        const mockToggleCommentsActive = jest.fn();

        renderWithDefaultData(<Comments count={1} toggleCommentsActive={mockToggleCommentsActive} />);

        const count = screen.getByText('1 comments');
        expect(count).toBeInTheDocument();
    });

    it('display properly count', async () => {
        const mockToggleCommentsActive = jest.fn();
        const user = userEvent.setup();

        renderWithDefaultData(<Comments count={1} toggleCommentsActive={mockToggleCommentsActive} />);

        const button = screen.getByLabelText('Toggle comments section');

        await user.click(button);

        expect(mockToggleCommentsActive).toHaveBeenCalledTimes(1);
    });
});