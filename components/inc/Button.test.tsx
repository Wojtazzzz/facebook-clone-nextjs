import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Button } from '@components/inc/Button';
import { screen } from '@testing-library/react';

describe('Button component', () => {
    it('renders with properly attributes', () => {
        renderWithDefaultData(<Button title="Go back" />);

        const button = screen.getByText('Go back');

        expect(button).toBeVisible();
        expect(button).toHaveAttribute('title', 'Go back');
        expect(button).toHaveAttribute('aria-label', 'Go back');
        expect(button).toHaveAttribute('type', 'button');
        expect(button).not.toHaveAttribute('disabled');
        expect(button).not.toHaveAttribute('onclick');
        expect(button).toHaveTextContent('Go back');
    });

    it('execute callback function when click on button', () => {
        const mockCallback = jest.fn();

        renderWithDefaultData(<Button title="Home button" callback={mockCallback} />);

        const button = screen.getByText('Home button');
        button.click();

        expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('not execute callback function when button is disabled', () => {
        const mockCallback = jest.fn();

        renderWithDefaultData(<Button title="Don't click" isDisabled callback={mockCallback} />);

        const button = screen.getByText("Don't click");
        button.click();

        expect(mockCallback).not.toHaveBeenCalled();
    });
});
