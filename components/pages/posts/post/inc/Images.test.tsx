import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Images } from '@components/pages/posts/post/inc/Images';
import PostWithFiveImages from '@mocks/posts/postWithFiveImages.json';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Images component', () => {
    const user = userEvent.setup();

    it('open gallery on click', async () => {
        renderWithDefaultData(<Images images={PostWithFiveImages.images} />);

        const container = screen.getByLabelText('Images', { selector: 'section' });
        await user.click(container);

        const gallery = await screen.findByLabelText('Post gallery', { selector: 'section' });

        expect(gallery).toBeVisible();
    });

    it('display properly number of images when has more than 2', async () => {
        renderWithDefaultData(<Images images={PostWithFiveImages.images} />);

        const text = screen.getByText(`+${PostWithFiveImages.images.length - 2}`);

        expect(text).toBeInTheDocument();
    });
});
