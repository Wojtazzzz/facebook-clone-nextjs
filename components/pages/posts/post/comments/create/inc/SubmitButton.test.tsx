import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { SubmitButton } from '@components/pages/posts/post/comments/create/inc/SubmitButton';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('SubmitButton component', () => {
    const user = userEvent.setup();

    it('show submit arrow when state is empty and not showing spinner loader', () => {
        const mockHandleSubmitComment = jest.fn();

        renderWithDefaultData(<SubmitButton isLoading={false} callback={mockHandleSubmitComment} />);

        const spinner = screen.queryByTestId('commentSubmitButton-loader');
        expect(spinner).not.toBeInTheDocument();

        const button = screen.getByLabelText('Submit comment');
        expect(button).toBeInTheDocument();
    });

    it('show submit arrow when state is loading and not showing submit arrow', () => {
        const mockHandleSubmitComment = jest.fn();

        renderWithDefaultData(<SubmitButton isLoading={true} callback={mockHandleSubmitComment} />);

        const button = screen.queryByLabelText('Submit comment');
        expect(button).not.toBeInTheDocument();

        const spinner = screen.getByTestId('commentSubmitButton-loader');
        expect(spinner).toBeInTheDocument();
    });

    it('execute callback function on click', async () => {
        const mockHandleSubmitComment = jest.fn();

        renderWithDefaultData(<SubmitButton isLoading={false} callback={mockHandleSubmitComment} />);

        const button = screen.getByLabelText('Submit comment');
        await user.click(button);

        expect(mockHandleSubmitComment).toBeCalledTimes(1);
    });

    it('cannot execute callback function on click when state is loading', async () => {
        const mockHandleSubmitComment = jest.fn();

        renderWithDefaultData(<SubmitButton isLoading={true} callback={mockHandleSubmitComment} />);

        const spinner = screen.getByTestId('commentSubmitButton-loader');
        await user.click(spinner);

        expect(mockHandleSubmitComment).not.toBeCalled();
    });
});
