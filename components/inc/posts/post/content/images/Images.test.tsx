import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import PostWithFiveImages from '@mocks/posts/postWithFiveImages.json';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Images } from './Images';

describe('Images component tests', () => {
    const user = userEvent.setup();

    it('open gallery on click', async () => {
        renderWithDefaultData(<Images images={PostWithFiveImages.images} />);

        const showGalleryButton = screen.getByLabelText('Show gallery');
        await user.click(showGalleryButton);

        const gallery = await screen.findByLabelText('Gallery of post images');

        expect(gallery).toBeVisible();
    });

    it('display properly number of images when has more than 2', async () => {
        renderWithDefaultData(<Images images={PostWithFiveImages.images} />);

        const text = screen.getByText(`+${PostWithFiveImages.images.length - 2}`);

        expect(text).toBeInTheDocument();
    });
});
