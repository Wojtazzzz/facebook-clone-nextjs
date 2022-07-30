import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Option } from '@components/pages/posts/post/header/settings/menu/Option';
import { screen } from '@testing-library/react';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import userEvent from '@testing-library/user-event';

describe('Option component', () => {
    it('title used as text and aria-label', () => {
        const mockCallback = jest.fn();

        renderWithDefaultData(<Option icon={faBan} title="Test title" callback={mockCallback} />);

        const label = screen.getByLabelText('Test title');
        const text = screen.getByText('Test title');

        expect(label).toBeInTheDocument();
        expect(text).toBeInTheDocument();
    });

    it('execute callback function when click', async () => {
        const mockCallback = jest.fn();
        const user = userEvent.setup();

        renderWithDefaultData(<Option icon={faBan} title="Test title" callback={mockCallback} />);

        const button = screen.getByLabelText('Test title');
        await user.click(button);

        expect(mockCallback).toHaveBeenCalledTimes(1);
    });
});
