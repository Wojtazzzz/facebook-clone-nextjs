import { Root as DialogRoot } from '@radix-ui/react-dialog';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mock } from '@utils/nock';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Modal } from './Modal';

const changeBodyPointerEvents = () => (document.body.style.pointerEvents = 'all');

describe('Modal component tests', () => {
    const mockClose = jest.fn();
    const user = userEvent.setup();

    it('render modal with correct header', () => {
        mock({
            path: '/api/user/email',
            data: 'jane.doe@fakeemail.com',
        });

        renderWithDefaultData(
            <DialogRoot open={true} modal={true}>
                <Modal close={mockClose} />
            </DialogRoot>
        );

        changeBodyPointerEvents();

        const header = screen.getByText('Auth Credentials');

        expect(header).toBeInTheDocument();
    });

    it('execute close modal function by click on Close Modal button', async () => {
        mock({
            path: '/api/user/email',
            data: 'jane.doe@fakeemail.com',
        });

        const mockClose = jest.fn();

        renderWithDefaultData(
            <DialogRoot open={true} modal={true}>
                <Modal close={mockClose} />
            </DialogRoot>
        );

        changeBodyPointerEvents();

        const closeButton = screen.getByLabelText('Close modal');
        await user.click(closeButton);

        expect(mockClose).toBeCalledTimes(1);
    });

    it('render loader when waiting for response', async () => {
        mock({
            path: '/api/user/email',
            data: 'jane.doe@fakeemail.com',
        });

        renderWithDefaultData(
            <DialogRoot open={true} modal={true}>
                <Modal close={mockClose} />
            </DialogRoot>
        );

        changeBodyPointerEvents();

        const loader = screen.getByTestId('credentialsModal-header');

        expect(loader).toBeInTheDocument();
    });

    it('render error when response return server error', async () => {
        mock({
            path: '/api/user/email',
            status: 500,
        });

        renderWithDefaultData(
            <DialogRoot open={true} modal={true}>
                <Modal close={mockClose} />
            </DialogRoot>
        );

        changeBodyPointerEvents();

        const error = await screen.findByTestId('server-error');

        expect(error).toBeInTheDocument();
    });

    it('render correct email and password when api return success', async () => {
        mock({
            path: '/api/user/email',
            data: 'jane.doe@fakeemail.com',
        });

        renderWithDefaultData(
            <DialogRoot open={true} modal={true}>
                <Modal close={mockClose} />
            </DialogRoot>
        );

        changeBodyPointerEvents();

        const email = await screen.findByTestId('Email-value');
        const password = await screen.findByTestId('Password-value');

        expect(email).toHaveTextContent('jane.doe@fakeemail.com');
        expect(password).toHaveTextContent('password');
    });

    it('email has green color after click on it', async () => {
        mock({
            path: '/api/user/email',
            data: 'jane.doe@fakeemail.com',
        });

        renderWithDefaultData(
            <DialogRoot open={true} modal={true}>
                <Modal close={mockClose} />
            </DialogRoot>
        );

        changeBodyPointerEvents();

        const email = await screen.findByTestId('Email-value');

        await user.click(email);

        expect(email).toHaveClass('text-green-500');
    });

    it('copy email after click on its value', async () => {
        jest.spyOn(navigator.clipboard, 'writeText');

        mock({
            path: '/api/user/email',
            data: 'jane.doe@fakeemail.com',
        });

        renderWithDefaultData(
            <DialogRoot open={true} modal={true}>
                <Modal close={mockClose} />
            </DialogRoot>
        );

        changeBodyPointerEvents();

        const email = await screen.findByTestId('Email-value');

        await user.click(email);

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('jane.doe@fakeemail.com');
    });

    it('copy password after click on its value', async () => {
        jest.spyOn(navigator.clipboard, 'writeText');

        mock({
            path: '/api/user/email',
            data: 'jane.doe@fakeemail.com',
        });

        renderWithDefaultData(
            <DialogRoot open={true} modal={true}>
                <Modal close={mockClose} />
            </DialogRoot>
        );

        changeBodyPointerEvents();

        const password = await screen.findByTestId('Password-value');

        await user.click(password);

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('password');
    });
});
