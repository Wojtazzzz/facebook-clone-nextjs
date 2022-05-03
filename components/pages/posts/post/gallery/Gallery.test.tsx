import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Gallery } from '@components/pages/posts/post/gallery/Gallery';
import PostWithFiveImages from '@mocks/posts/postWithFiveImages.json';
import { screen } from '@testing-library/react';

describe('Gallery component', () => {
    it('has close button and execute close function when click on it', () => {
        const mockHandleCloseGallery = jest.fn();

        renderWithDefaultData(
            <Gallery images={PostWithFiveImages.images} handleCloseGallery={mockHandleCloseGallery} />
        );

        const closeButton = screen.getByLabelText('Close gallery');
        expect(closeButton).toBeInTheDocument();

        closeButton.click();

        expect(mockHandleCloseGallery).toBeCalledTimes(1);
    });
});
