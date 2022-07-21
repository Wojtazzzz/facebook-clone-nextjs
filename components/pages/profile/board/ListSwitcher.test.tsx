import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { ListSwitcher } from '@components/pages/profile/board/ListSwitcher';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ListSwitcher component', () => {
    const mockChangePostsList = jest.fn();
    const user = userEvent.setup();

    it('swicher has value OWN as default ', async () => {
        renderWithDefaultData(<ListSwitcher changePostsList={mockChangePostsList} />);

        const switcher = screen.getByLabelText('Change list of posts');

        expect(switcher).toHaveValue('OWN');
        expect(switcher).toHaveDisplayValue('Own posts');
    });

    it('can change swicher value to HIDDEN', async () => {
        renderWithDefaultData(<ListSwitcher changePostsList={mockChangePostsList} />);

        const switcher = screen.getByLabelText('Change list of posts');
        await user.selectOptions(switcher, 'HIDDEN');

        expect(switcher).toHaveValue('HIDDEN');
        expect(switcher).toHaveDisplayValue('Hidden posts');
    });

    it('can change swicher value to SAVED', async () => {
        renderWithDefaultData(<ListSwitcher changePostsList={mockChangePostsList} />);

        const switcher = screen.getByLabelText('Change list of posts');
        await user.selectOptions(switcher, 'SAVED');

        expect(switcher).toHaveValue('SAVED');
        expect(switcher).toHaveDisplayValue('Saved posts');
    });

    it('can change swicher value to HIDDEN and return back to OWN', async () => {
        renderWithDefaultData(<ListSwitcher changePostsList={mockChangePostsList} />);

        const switcher = screen.getByLabelText('Change list of posts');
        await user.selectOptions(switcher, 'SAVED');

        expect(switcher).toHaveValue('SAVED');
        expect(switcher).toHaveDisplayValue('Saved posts');

        await user.selectOptions(switcher, 'OWN');

        expect(switcher).toHaveValue('OWN');
        expect(switcher).toHaveDisplayValue('Own posts');
    });
});
