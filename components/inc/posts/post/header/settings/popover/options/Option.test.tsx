import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import userEvent from '@testing-library/user-event';
import { Option } from './Option';

describe('Option component tests', () => {
    const mockCallback = jest.fn();

    it('title used as text and aria-label', () => {
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

    it('option with isLoading show loading cursor', async () => {
        renderWithDefaultData(<Option icon={faBan} title="Test title" isLoading callback={mockCallback} />);

        const button = screen.getByLabelText('Test title');

        expect(button).toHaveClass('cursor-wait');
    });

    it('cannot execute callback when isLoading passed', async () => {
        const mockCallback = jest.fn();
        const user = userEvent.setup();

        renderWithDefaultData(<Option icon={faBan} title="Test title" isLoading callback={mockCallback} />);

        const button = screen.getByLabelText('Test title');
        await user.click(button);

        expect(mockCallback).toHaveBeenCalledTimes(0);
    });

    it('option with isDisabled prop show block cursor', async () => {
        renderWithDefaultData(<Option icon={faBan} title="Test title" isDisabled callback={mockCallback} />);

        const button = screen.getByLabelText('Test title');

        expect(button).toHaveClass('cursor-not-allowed');
    });

    it('cannot execute callback when isDisabled passed', async () => {
        const mockCallback = jest.fn();
        const user = userEvent.setup();

        renderWithDefaultData(<Option icon={faBan} title="Test title" isDisabled callback={mockCallback} />);

        const button = screen.getByLabelText('Test title');
        await user.click(button);

        expect(mockCallback).toHaveBeenCalledTimes(0);
    });
});
