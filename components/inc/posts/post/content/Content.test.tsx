import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import PostWithFiveImagesJson from '@mocks/posts/postWithFiveImages.json';
import { screen } from '@testing-library/react';
import { Content } from './Content';

describe('Content component tests', () => {
    const { content, images } = PostWithFiveImagesJson;

    it('render text and images', () => {
        renderWithDefaultData(<Content content={content} images={images} />);

        const text = screen.getByTestId('post-content');
        const imagesElement = screen.getByLabelText('Show gallery');

        expect(text).toBeInTheDocument();
        expect(imagesElement).toBeInTheDocument();
    });

    it('render only text when no images passed', () => {
        renderWithDefaultData(<Content images={[]} content={content} />);

        const text = screen.getByTestId('post-content');
        const imagesElement = screen.queryByLabelText('Show gallery');

        expect(text).toBeInTheDocument();
        expect(text).toHaveTextContent(content);

        expect(imagesElement).not.toBeInTheDocument();
    });

    it('render only images when no text passed', () => {
        renderWithDefaultData(<Content images={images} content="" />);

        const text = screen.queryByTestId('post-content');
        const imagesElement = screen.getByLabelText('Show gallery');

        expect(text).not.toBeInTheDocument();
        expect(imagesElement).toBeInTheDocument();
    });
});
