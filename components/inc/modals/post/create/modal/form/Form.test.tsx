import { mock } from '@libs/nock';
import RootUserJson from '@mocks/user/root.json';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Form } from './Form';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { generateFile } from '@utils/tests/generateFile';
import { getPostsQK } from '@utils/queryKeys';

describe('Form component', () => {
    jest.setTimeout(30000);

    beforeEach(() => {
        mock({
            path: '/api/user',
            data: RootUserJson,
        });

        mock({
            path: '/api/posts?page=1',
            data: PostsFirstPageJson,
        });
    });

    it('render too short text validation message', async () => {
        const mockClose = jest.fn();

        const user = userEvent.setup();

        renderWithDefaultData(<Form queryKey={getPostsQK({ type: 'all' })} close={mockClose} />);

        const input = screen.getByLabelText('Post content');
        const submitButton = screen.getByLabelText('Create post');

        await user.type(input, 'f');
        await user.click(submitButton);

        const tooShortValidationMessage = await screen.findByText('Post must be at least 2 characters');

        expect(tooShortValidationMessage).toBeInTheDocument();
    });

    it('render too long text validation message', async () => {
        const mockClose = jest.fn();

        const user = userEvent.setup();

        renderWithDefaultData(<Form queryKey={getPostsQK({ type: 'all' })} close={mockClose} />);

        const submitButton = screen.getByLabelText('Create post');
        const input = screen.getByLabelText('Post content');

        await user.type(input, LONG_TEXT);
        await user.click(submitButton);

        const emptyPostValidationMessage = await screen.findByText('Post must be at most 1000 characters');

        expect(emptyPostValidationMessage).toBeInTheDocument();
    });

    it('render empty post validation message', async () => {
        const mockClose = jest.fn();

        const user = userEvent.setup();

        renderWithDefaultData(<Form queryKey={getPostsQK({ type: 'all' })} close={mockClose} />);

        const submitButton = screen.getByLabelText('Create post');
        await user.click(submitButton);

        const emptyPostValidationMessage = await screen.findByText('Post must contain text or image(s)');

        expect(emptyPostValidationMessage).toBeInTheDocument();
    });

    it('render input file when click on render button', async () => {
        const mockClose = jest.fn();

        const user = userEvent.setup();

        renderWithDefaultData(<Form queryKey={getPostsQK({ type: 'all' })} close={mockClose} />);

        const renderButton = screen.getByLabelText('Show files uploader');

        await user.click(renderButton);

        const inputFile = screen.getByLabelText('Images input');

        expect(inputFile).toBeInTheDocument();
    });

    it('render uploaded image name', async () => {
        const user = userEvent.setup();
        const mockClose = jest.fn();

        const file = generateFile('testImage.png', 'image/png');

        renderWithDefaultData(<Form queryKey={getPostsQK({ type: 'all' })} close={mockClose} />);

        const renderButton = screen.getByLabelText('Show files uploader');
        await user.click(renderButton);

        const inputFile = screen.getByLabelText('Images input');
        await user.upload(inputFile, file);

        const imageName = screen.getByText(file.name);

        expect(imageName).toBeInTheDocument();
    });

    it('cannot upload image which has illegal extension', async () => {
        const user = userEvent.setup();
        const mockClose = jest.fn();
        const file = generateFile('testFile.pdf', 'application/pdf');

        renderWithDefaultData(<Form queryKey={getPostsQK({ type: 'all' })} close={mockClose} />);

        const renderButton = screen.getByLabelText('Show files uploader');
        await user.click(renderButton);

        const inputFile = screen.getByLabelText('Images input');

        await user.upload(inputFile, file);

        const imageName = screen.queryByText(file.name);

        expect(imageName).not.toBeInTheDocument();
    });

    it('can upload multiple images', async () => {
        const user = userEvent.setup();
        const mockClose = jest.fn();

        const images = [
            generateFile('firstFile.png', 'image/png'),
            generateFile('secondFile.jpg', 'image/jpg'),
            generateFile('thirdFile.jpeg', 'image/jpeg'),
        ];

        renderWithDefaultData(<Form queryKey={getPostsQK({ type: 'all' })} close={mockClose} />);

        const renderButton = screen.getByLabelText('Show files uploader');
        await user.click(renderButton);

        const inputFile = screen.getByLabelText('Images input');
        await user.upload(inputFile, images);

        const firstImageName = screen.getByText(images[0].name);
        const secondImageName = screen.getByText(images[1].name);
        const thirdImageName = screen.getByText(images[2].name);

        expect(firstImageName).toBeInTheDocument();
        expect(secondImageName).toBeInTheDocument();
        expect(thirdImageName).toBeInTheDocument();
    });

    it('can remove image from uploaded images list', async () => {
        const user = userEvent.setup();
        const mockClose = jest.fn();

        const images = [
            generateFile('firstFile.png', 'image/png'),
            generateFile('secondFile.jpg', 'image/jpg'),
            generateFile('thirdFile.jpeg', 'image/jpeg'),
        ];

        renderWithDefaultData(<Form queryKey={getPostsQK({ type: 'all' })} close={mockClose} />);

        const renderButton = screen.getByLabelText('Show files uploader');
        await user.click(renderButton);

        const inputFile = screen.getByLabelText('Images input');

        await user.upload(inputFile, images);

        const removeSecondImageButton = screen.getByLabelText(`Remove ${images[1].name} from images list`);

        const secondImageName = screen.getByText(images[1].name);

        expect(secondImageName).toBeInTheDocument();

        await user.click(removeSecondImageButton);

        expect(secondImageName).not.toBeInTheDocument();
    });

    it('removing one image cannot remove another image(s) from list', async () => {
        const user = userEvent.setup();
        const mockClose = jest.fn();

        const images = [
            generateFile('firstFile.png', 'image/png'),
            generateFile('secondFile.jpg', 'image/jpg'),
            generateFile('thirdFile.jpeg', 'image/jpeg'),
        ];

        renderWithDefaultData(<Form queryKey={getPostsQK({ type: 'all' })} close={mockClose} />);

        const renderButton = screen.getByLabelText('Show files uploader');
        await user.click(renderButton);

        const inputFile = screen.getByLabelText('Images input');
        await user.upload(inputFile, images);

        const removeSecondFileButton = screen.getByLabelText(`Remove ${images[1].name} from images list`);
        await user.click(removeSecondFileButton);

        await waitFor(() => {
            const displayedFirstImageName = screen.queryByText(images[0].name);
            expect(displayedFirstImageName).toBeInTheDocument();
        });

        await waitFor(() => {
            const secondImageName = screen.queryByText(images[0].name);
            expect(secondImageName).toBeInTheDocument();
        });

        await waitFor(() => {
            const displayedThirdImageName = screen.queryByText(images[0].name);
            expect(displayedThirdImageName).toBeInTheDocument();
        });
    });

    it('render properly count of uploaded images', async () => {
        const user = userEvent.setup();
        const mockClose = jest.fn();

        const images = [
            generateFile('firstFile.png', 'image/png'),
            generateFile('secondFile.jpg', 'image/jpg'),
            generateFile('thirdFile.jpeg', 'image/jpeg'),
            generateFile('fourthFile.jpeg', 'image/gif'),
            generateFile('fivethFile.jpeg', 'image/webp'),
        ];

        renderWithDefaultData(<Form queryKey={getPostsQK({ type: 'all' })} close={mockClose} />);

        const renderButton = screen.getByLabelText('Show files uploader');
        await user.click(renderButton);

        const inputFile = screen.getByLabelText('Images input');

        await user.upload(inputFile, images);

        const count = screen.getByText(`Uploaded images: ${images.length}`);

        expect(count).toBeInTheDocument();
    });
});

const LONG_TEXT =
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
