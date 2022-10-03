import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import PostWithFiveImages from '@mocks/posts/postWithFiveImages.json';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Gallery } from './Gallery';

describe('Gallery component', () => {
    const user = userEvent.setup();

    it('has close button and execute close function when click on it', async () => {
        const mockCloseGallery = jest.fn();

        renderWithDefaultData(<Gallery images={PostWithFiveImages.images} closeGallery={mockCloseGallery} />);

        const closeButton = screen.getByLabelText('Close gallery');
        expect(closeButton).toBeInTheDocument();

        await user.click(closeButton);

        expect(mockCloseGallery).toBeCalledTimes(1);
    });
});
