import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { PanelButton } from '@components/pages/posts/post/inc/PanelButton';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { screen } from '@testing-library/react';

describe('PanelButton component', () => {
    it('execute callback on click', () => {
        const mockHandleLikePost = jest.fn();

        renderWithDefaultData(<PanelButton title="Like" icon={faThumbsUp} callback={mockHandleLikePost} />);

        const button = screen.getByRole('button');
        button.click();

        expect(mockHandleLikePost).toBeCalledTimes(1);
    });

    it('has blue text color class when is active', () => {
        const mockHandleLikePost = jest.fn();

        renderWithDefaultData(
            <PanelButton title="Like" isActive={true} icon={faThumbsUp} callback={mockHandleLikePost} />
        );

        const button = screen.getByRole('button');

        expect(button).toHaveClass('text-primary');
    });

    it('has white text color class when is deactive', () => {
        const mockHandleLikePost = jest.fn();

        renderWithDefaultData(
            <PanelButton title="Like" isActive={false} icon={faThumbsUp} callback={mockHandleLikePost} />
        );

        const button = screen.getByRole('button');

        expect(button).toHaveClass('text-light-100');
    });

    it('render title properly', () => {
        const mockHandleLikePost = jest.fn();

        renderWithDefaultData(<PanelButton title="UNEXPECTED_TITLE" icon={faThumbsUp} callback={mockHandleLikePost} />);

        const title = screen.getByText('UNEXPECTED_TITLE');

        expect(title).toBeInTheDocument();
    });
});
