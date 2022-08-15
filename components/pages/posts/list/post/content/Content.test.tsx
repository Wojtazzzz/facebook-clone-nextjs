import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Content } from '@components/pages/posts/list/post/content/Content';
import PostWithFiveImagesJson from '@mocks/posts/postWithFiveImages.json';
import { screen } from '@testing-library/react';

describe('Content component', () => {
    const { content, images } = PostWithFiveImagesJson;

    it('render text and images', () => {
        renderWithDefaultData(<Content content={content} images={images} />);

        const textComponent = screen.getByLabelText('Content', { selector: 'section' });
        const imagesComponent = screen.getByLabelText('Images', { selector: 'section' });

        expect(textComponent).toBeInTheDocument();
        expect(imagesComponent).toBeInTheDocument();
    });

    it('render only text when no images passed', () => {
        renderWithDefaultData(<Content content={content} />);

        const textComponent = screen.getByLabelText('Content', { selector: 'section' });
        const imagesComponent = screen.queryByLabelText('Images', { selector: 'section' });

        expect(textComponent).toBeInTheDocument();
        expect(textComponent).toHaveTextContent(content);

        expect(imagesComponent).not.toBeInTheDocument();
    });

    it('render only images when no text passed', () => {
        renderWithDefaultData(<Content images={images} />);

        const textComponent = screen.queryByLabelText('Content', { selector: 'section' });
        const imagesComponent = screen.getByLabelText('Images', { selector: 'section' });

        expect(textComponent).not.toBeInTheDocument();
        expect(imagesComponent).toBeInTheDocument();
    });
});
