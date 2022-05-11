import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { SubmitButton } from '@components/pages/posts/post/comments/create/inc/SubmitButton';
import { screen } from '@testing-library/react';

describe('SubmitButton component', () => {
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

    it('execute callback function on click', () => {
        const mockHandleSubmitComment = jest.fn();

        renderWithDefaultData(<SubmitButton isLoading={false} callback={mockHandleSubmitComment} />);

        const button = screen.getByLabelText('Submit comment');
        button.click();

        expect(mockHandleSubmitComment).toBeCalledTimes(1);
    });

    it('cannot execute callback function on click when state is loading', () => {
        const mockHandleSubmitComment = jest.fn();

        renderWithDefaultData(<SubmitButton isLoading={true} callback={mockHandleSubmitComment} />);

        const spinner = screen.getByTestId('commentSubmitButton-loader');
        spinner.click();

        expect(mockHandleSubmitComment).not.toBeCalled();
    });
});
