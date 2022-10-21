import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mock } from '@utils/nock';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Credentials } from './Credentials';

describe('Credentials component tests', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        mock({
            path: '/api/user/email',
            data: 'jane.doe@fakeemail.com',
        });
    });

    it('render button', () => {
        renderWithDefaultData(<Credentials />);

        const button = screen.getByLabelText('Credentials');

        expect(button).toBeEnabled();
    });

    it('open modal by click on button', async () => {
        renderWithDefaultData(<Credentials />);

        const button = screen.getByLabelText('Credentials');
        await user.click(button);

        const modal = screen.getByRole('dialog');

        expect(modal).toBeInTheDocument();
    });
});
