import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Gallery } from './Gallery';

describe('Gallery component', () => {
    const user = userEvent.setup();
    const images = [
        'https://picsum.photos/seed/62fd0d6ea9cac/850/350',
        'https://picsum.photos/seed/62fd0d6ea9cad/850/350',
        'https://picsum.photos/seed/62fd0d6ea9cae/850/350',
        'https://picsum.photos/seed/62fd0d6ea9caf/850/350',
        'https://picsum.photos/seed/62fd0d6dd6210/850/350',
    ];

    it('has close button and execute close function when click on it', async () => {
        const mockCloseGallery = jest.fn();

        renderWithDefaultData(<Gallery images={images} closeGallery={mockCloseGallery} />);

        const closeButton = screen.getByLabelText('Close gallery');
        expect(closeButton).toBeInTheDocument();

        await user.click(closeButton);

        expect(mockCloseGallery).toBeCalledTimes(1);
    });

    it('render correct count of slides', async () => {
        const mockCloseGallery = jest.fn();

        renderWithDefaultData(<Gallery images={images} closeGallery={mockCloseGallery} />);

        const slides = screen.getAllByLabelText(`of ${images.length}`, { exact: false });

        expect(slides).toHaveLength(images.length);
    });

    it('render prev and next image button', async () => {
        const mockCloseGallery = jest.fn();

        renderWithDefaultData(<Gallery images={images} closeGallery={mockCloseGallery} />);

        const prevButton = screen.getByLabelText('Prev image', { selector: 'button' });
        const nextButton = screen.getByLabelText('Next image', { selector: 'button' });

        expect(prevButton).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();
    });

    it('render correct count of thumbs', async () => {
        const mockCloseGallery = jest.fn();

        renderWithDefaultData(<Gallery images={images} closeGallery={mockCloseGallery} />);

        const thumbsContainer = screen.getByTestId('gallery-thumbs');

        const thumbs = within(thumbsContainer).getAllByRole('button');

        expect(thumbs).toHaveLength(images.length);
    });
});
