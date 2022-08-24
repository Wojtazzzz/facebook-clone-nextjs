import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Settings } from './Settings';

describe('Settings component', () => {
    const user = userEvent.setup();

    it('open menu when click on button', async () => {
        renderWithDefaultData(<Settings postId={1} type="OWN" />);

        const button = screen.getByLabelText('Show post settings');
        await user.click(button);

        const menu = await screen.findByLabelText('Settings');

        expect(menu).toBeInTheDocument();
    });

    it('always render global menu', async () => {
        renderWithDefaultData(<Settings postId={1} type="OWN" />);

        const button = screen.getByLabelText('Show post settings');
        await user.click(button);

        const option = screen.getByLabelText('Report');

        expect(option).toBeInTheDocument();
    });
});
