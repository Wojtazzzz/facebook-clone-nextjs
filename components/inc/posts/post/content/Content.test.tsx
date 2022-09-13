import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import PostWithFiveImagesJson from '@mocks/posts/postWithFiveImages.json';
import { screen } from '@testing-library/react';
import { Content } from './Content';

describe('Content component', () => {
    const { content, images } = PostWithFiveImagesJson;

    it('render text and images', () => {
        renderWithDefaultData(<Content content={content} images={images} />);

        const textComponent = screen.getByLabelText('Content', { selector: 'section' });
        const imagesComponent = screen.getByLabelText('Show gallery');

        expect(textComponent).toBeInTheDocument();
        expect(imagesComponent).toBeInTheDocument();
    });

    it('render only text when no images passed', () => {
        renderWithDefaultData(<Content images={[]} content={content} />);

        const textComponent = screen.getByLabelText('Content', { selector: 'section' });
        const imagesComponent = screen.queryByLabelText('Show gallery');

        expect(textComponent).toBeInTheDocument();
        expect(textComponent).toHaveTextContent(content);

        expect(imagesComponent).not.toBeInTheDocument();
    });

    it('render only images when no text passed', () => {
        renderWithDefaultData(<Content images={images} content="" />);

        const textComponent = screen.queryByLabelText('Content', { selector: 'section' });
        const imagesComponent = screen.getByLabelText('Show gallery');

        expect(textComponent).not.toBeInTheDocument();
        expect(imagesComponent).toBeInTheDocument();
    });
});
