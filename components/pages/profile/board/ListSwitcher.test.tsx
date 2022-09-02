import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { ListSwitcher } from '@components/pages/profile/board/ListSwitcher';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ListSwitcher component', () => {
    const mockChangeList = jest.fn();
    const user = userEvent.setup();

    it('swicher has value "own" as default ', async () => {
        renderWithDefaultData(<ListSwitcher changeList={mockChangeList} />);

        const switcher = screen.getByLabelText('Change list of posts');

        expect(switcher).toHaveValue('own');
        expect(switcher).toHaveDisplayValue('Own posts');
    });

    it('can change swicher value to "hidden"', async () => {
        renderWithDefaultData(<ListSwitcher changeList={mockChangeList} />);

        const switcher = screen.getByLabelText('Change list of posts');
        await user.selectOptions(switcher, 'hidden');

        expect(switcher).toHaveValue('hidden');
        expect(switcher).toHaveDisplayValue('Hidden posts');
    });

    it('can change swicher value to "saved"', async () => {
        renderWithDefaultData(<ListSwitcher changeList={mockChangeList} />);

        const switcher = screen.getByLabelText('Change list of posts');
        await user.selectOptions(switcher, 'saved');

        expect(switcher).toHaveValue('saved');
        expect(switcher).toHaveDisplayValue('Saved posts');
    });

    it('can change swicher value to "hidden" and return back to "own"', async () => {
        renderWithDefaultData(<ListSwitcher changeList={mockChangeList} />);

        const switcher = screen.getByLabelText('Change list of posts');
        await user.selectOptions(switcher, 'saved');

        expect(switcher).toHaveValue('saved');
        expect(switcher).toHaveDisplayValue('Saved posts');

        await user.selectOptions(switcher, 'own');

        expect(switcher).toHaveValue('own');
        expect(switcher).toHaveDisplayValue('Own posts');
    });
});
