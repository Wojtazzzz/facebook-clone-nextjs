import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PanelButton } from './PanelButton';

describe('PanelButton component tests', () => {
    const mockHandleLikePost = jest.fn();
    const user = userEvent.setup();

    it('execute callback on click', async () => {
        const mockHandleLikePost = jest.fn();

        renderWithDefaultData(<PanelButton title="Like" icon={faThumbsUp} callback={mockHandleLikePost} />);

        const button = screen.getByRole('button');
        await user.click(button);

        expect(mockHandleLikePost).toBeCalledTimes(1);
    });

    it('has blue text color class when is active', () => {
        renderWithDefaultData(
            <PanelButton title="Like" isActive={true} icon={faThumbsUp} callback={mockHandleLikePost} />
        );

        const button = screen.getByRole('button');

        expect(button).toHaveClass('text-primary-light');
    });

    it('has white text color class when is deactive', () => {
        renderWithDefaultData(
            <PanelButton title="Like" isActive={false} icon={faThumbsUp} callback={mockHandleLikePost} />
        );

        const button = screen.getByRole('button');

        expect(button).toHaveClass('text-light-100');
    });

    it('render title properly', () => {
        renderWithDefaultData(<PanelButton title="UNEXPECTED_TITLE" icon={faThumbsUp} callback={mockHandleLikePost} />);

        const title = screen.getByText('UNEXPECTED_TITLE');

        expect(title).toBeInTheDocument();
    });
});
