import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { SubmitButton } from './SubmitButton';

describe('SubmitButton component', () => {
    it('show submit arrow when state is empty and not showing spinner loader', () => {
        renderWithDefaultData(<SubmitButton isLoading={false} />);

        const spinner = screen.queryByTestId('commentSubmitButton-loader');
        expect(spinner).not.toBeInTheDocument();

        const button = screen.getByLabelText('Submit comment');
        expect(button).toBeInTheDocument();
    });

    it('show submit arrow when state is loading and not showing submit arrow', () => {
        renderWithDefaultData(<SubmitButton isLoading={true} />);

        const button = screen.queryByLabelText('Submit comment');
        expect(button).not.toBeInTheDocument();

        const spinner = screen.getByTestId('commentSubmitButton-loader');
        expect(spinner).toBeInTheDocument();
    });
});
