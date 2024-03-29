import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { NavToggler } from './NavToggler';

describe('NavToggler component tests', () => {
    const user = userEvent.setup();
    const mockToggle = jest.fn();

    it('has properly label when is active', () => {
        renderWithDefaultData(<NavToggler isActive={true} toggle={mockToggle} />);

        const toggler = screen.getByRole('button');

        expect(toggler).toHaveAccessibleName('Close navigation');
    });

    it('has properly label when is inactive', () => {
        renderWithDefaultData(<NavToggler isActive={false} toggle={mockToggle} />);

        const toggler = screen.getByRole('button');

        expect(toggler).toHaveAccessibleName('Open navigation');
    });

    it('fire toggle function when click', async () => {
        const mockToggle = jest.fn();

        renderWithDefaultData(<NavToggler isActive={false} toggle={mockToggle} />);

        const toggler = screen.getByRole('button');

        await user.click(toggler);
        expect(mockToggle).toBeCalledTimes(1);

        await user.click(toggler);
        expect(mockToggle).toBeCalledTimes(2);

        await user.click(toggler);
        expect(mockToggle).toBeCalledTimes(3);
    });
});
