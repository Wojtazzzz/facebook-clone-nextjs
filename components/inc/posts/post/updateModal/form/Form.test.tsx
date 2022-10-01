import { mock } from '@utils/nock';
import RootUserJson from '@mocks/user/root.json';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Form } from './Form';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { generateFile } from '@utils/tests/generateFile';
import { getPostsQK } from '@utils/queryKeys';

describe('Form component', () => {
    const user = userEvent.setup();

    jest.setTimeout(30000);

    beforeEach(() => {
        mock({
            path: '/api/user',
            data: RootUserJson,
        });
    });

    // it('render too short text validation message', async () => {
    //     const mockCloseModal = jest.fn();

    //     renderWithDefaultData(
    //         <Form
    //             queryKey={getPostsQK({ type: 'all' })}
    //             postId={1}
    //             content="Test content"
    //             images={[]}
    //             closeModal={mockCloseModal}
    //         />
    //     );

    //     const input = screen.getByLabelText('Post content');
    //     const submitButton = screen.getByLabelText('Update post');

    //     await user.clear(input);
    //     await user.type(input, 'f');
    //     await user.click(submitButton);

    //     const tooShortValidationMessage = await screen.findByText('Post must be at least 2 characters');

    //     expect(tooShortValidationMessage).toBeInTheDocument();
    // });

    // it('render too long text validation message', async () => {
    //     const mockCloseModal = jest.fn();

    //     renderWithDefaultData(
    //         <Form
    //             queryKey={getPostsQK({ type: 'all' })}
    //             postId={1}
    //             content="Test content"
    //             images={[]}
    //             closeModal={mockCloseModal}
    //         />
    //     );

    //     const submitButton = screen.getByLabelText('Update post');
    //     const input = screen.getByLabelText('Post content');

    //     await user.type(input, LONG_TEXT);
    //     await user.click(submitButton);

    //     const emptyPostValidationMessage = await screen.findByText('Post must be at most 1000 characters');

    //     expect(emptyPostValidationMessage).toBeInTheDocument();
    // });

    it('can pass empty content', async () => {
        mock({
            path: '/api/posts/1',
            status: 201,
            method: 'post',
        });

        const mockCloseModal = jest.fn();

        renderWithDefaultData(
            <Form
                queryKey={getPostsQK({ type: 'all' })}
                postId={1}
                content="Test content"
                images={[]}
                closeModal={mockCloseModal}
            />
        );

        const submitButton = screen.getByLabelText('Update post');
        const input = screen.getByLabelText('Post content');

        await user.clear(input);
        await user.click(submitButton);

        const validationError = screen.queryByText('Comment must contain text');

        expect(validationError).not.toBeInTheDocument();
    });

    it('render input file when click on render button', async () => {
        const mockCloseModal = jest.fn();

        renderWithDefaultData(
            <Form
                queryKey={getPostsQK({ type: 'all' })}
                postId={1}
                content="Test content"
                images={[]}
                closeModal={mockCloseModal}
            />
        );

        const renderButton = screen.getByLabelText('Show files uploader');

        await user.click(renderButton);

        const inputImage = screen.getByLabelText('Images input');

        expect(inputImage).toBeInTheDocument();
    });

    it('render uploaded image name', async () => {
        const mockCloseModal = jest.fn();

        const image = generateFile('testImage.png', 'image/png');

        renderWithDefaultData(
            <Form
                queryKey={getPostsQK({ type: 'all' })}
                postId={1}
                content="Test content"
                images={[]}
                closeModal={mockCloseModal}
            />
        );

        const renderButton = screen.getByLabelText('Show files uploader');
        await user.click(renderButton);

        const inputImage = screen.getByLabelText('Images input');
        await user.upload(inputImage, image);

        const displayedimageName = screen.getByText(image.name);

        expect(displayedimageName).toBeInTheDocument();
    });

    it('cannot upload image which has illegal extenstion', async () => {
        const mockCloseModal = jest.fn();

        const image = generateFile('testimage.pdf', 'application/pdf');

        renderWithDefaultData(
            <Form
                queryKey={getPostsQK({ type: 'all' })}
                postId={1}
                content="Test content"
                images={[]}
                closeModal={mockCloseModal}
            />
        );

        const renderButton = screen.getByLabelText('Show files uploader');
        await user.click(renderButton);

        const inputImage = screen.getByLabelText('Images input');

        await user.upload(inputImage, image);

        const displayedimageName = screen.queryByText(image.name);

        expect(displayedimageName).not.toBeInTheDocument();
    });

    it('can upload multiple images', async () => {
        const mockCloseModal = jest.fn();

        const images = [
            generateFile('firstimage.png', 'image/png'),
            generateFile('secondimage.jpg', 'image/jpg'),
            generateFile('thirdimage.jpeg', 'image/jpeg'),
        ];

        renderWithDefaultData(
            <Form
                queryKey={getPostsQK({ type: 'all' })}
                postId={1}
                content="Test content"
                images={[]}
                closeModal={mockCloseModal}
            />
        );

        const renderButton = screen.getByLabelText('Show files uploader');
        await user.click(renderButton);

        const inputImage = screen.getByLabelText('Images input');
        await user.upload(inputImage, images);

        const displayedFirstimageName = screen.getByText(images[0].name);
        const displayedSecondimageName = screen.getByText(images[1].name);
        const displayedThirdimageName = screen.getByText(images[2].name);

        expect(displayedFirstimageName).toBeInTheDocument();
        expect(displayedSecondimageName).toBeInTheDocument();
        expect(displayedThirdimageName).toBeInTheDocument();
    });

    it('can remove image from uploaded images list', async () => {
        const mockCloseModal = jest.fn();

        const images = [
            generateFile('firstimage.png', 'image/png'),
            generateFile('secondimage.jpg', 'image/jpg'),
            generateFile('thirdimage.jpeg', 'image/jpeg'),
        ];

        renderWithDefaultData(
            <Form
                queryKey={getPostsQK({ type: 'all' })}
                postId={1}
                content="Test content"
                images={[]}
                closeModal={mockCloseModal}
            />
        );

        const renderButton = screen.getByLabelText('Show files uploader');
        await user.click(renderButton);

        const inputImage = screen.getByLabelText('Images input');
        await user.upload(inputImage, images);

        const removeSecondimageButton = screen.getByLabelText(`Remove ${images[1].name} from updated images list`);

        const displayedSecondimageName = screen.getByText(images[1].name);

        expect(displayedSecondimageName).toBeInTheDocument();

        await user.click(removeSecondimageButton);

        expect(displayedSecondimageName).not.toBeInTheDocument();
    });

    it('removing one image cannot remove another image(s) from list', async () => {
        const mockCloseModal = jest.fn();

        const images = [
            generateFile('firstimage.png', 'image/png'),
            generateFile('secondimage.jpg', 'image/jpg'),
            generateFile('thirdimage.jpeg', 'image/jpeg'),
        ];

        renderWithDefaultData(
            <Form
                queryKey={getPostsQK({ type: 'all' })}
                postId={1}
                content="Test content"
                images={[]}
                closeModal={mockCloseModal}
            />
        );

        const renderButton = screen.getByLabelText('Show files uploader');
        await user.click(renderButton);

        const inputImage = screen.getByLabelText('Images input');
        await user.upload(inputImage, images);

        const removeSecondimageButton = screen.getByLabelText(`Remove ${images[1].name} from updated images list`);

        await user.click(removeSecondimageButton);

        await waitFor(() => {
            const displayedFirstimageName = screen.queryByText(images[0].name);
            expect(displayedFirstimageName).toBeInTheDocument();
        });

        await waitFor(() => {
            const displayedSecondimageName = screen.queryByText(images[0].name);
            expect(displayedSecondimageName).toBeInTheDocument();
        });

        await waitFor(() => {
            const displayedThirdimageName = screen.queryByText(images[0].name);
            expect(displayedThirdimageName).toBeInTheDocument();
        });
    });

    it('render properly count of uploaded images', async () => {
        const mockCloseModal = jest.fn();

        const images = [
            generateFile('firstimage.png', 'image/png'),
            generateFile('secondimage.jpg', 'image/jpg'),
            generateFile('thirdimage.jpeg', 'image/jpeg'),
            generateFile('fourthimage.jpeg', 'image/gif'),
            generateFile('fivethimage.jpeg', 'image/webp'),
        ];

        renderWithDefaultData(
            <Form
                queryKey={getPostsQK({ type: 'all' })}
                postId={1}
                content="Test content"
                images={[]}
                closeModal={mockCloseModal}
            />
        );

        const renderButton = screen.getByLabelText('Show files uploader');
        await user.click(renderButton);

        const inputImage = screen.getByLabelText('Images input');

        await user.upload(inputImage, images);

        const count = screen.getByText(`Uploaded images: ${images.length}`);

        expect(count).toBeInTheDocument();
    });

    it('list of uploaded images render properly count of images', async () => {
        const mockCloseModal = jest.fn();

        renderWithDefaultData(
            <Form
                queryKey={getPostsQK({ type: 'all' })}
                postId={1}
                content="Test content"
                images={['/posts/firstimage.png', '/posts/secondimage.jpg']}
                closeModal={mockCloseModal}
            />
        );

        const listOfUploadedimages = screen.getAllByLabelText('Uploaded image');

        expect(listOfUploadedimages).toHaveLength(2);
    });

    it('can remove image from uploaded images', async () => {
        const mockCloseModal = jest.fn();

        renderWithDefaultData(
            <Form
                queryKey={getPostsQK({ type: 'all' })}
                postId={1}
                content="Test content"
                images={['/posts/firstimage.png', '/posts/secondimage.jpg']}
                closeModal={mockCloseModal}
            />
        );

        const listOfUploadedimages = screen.getAllByLabelText('Uploaded image');

        expect(listOfUploadedimages).toHaveLength(2);

        const removeButton = screen.getAllByLabelText('Remove image');

        await user.click(removeButton[0]);

        expect(screen.getAllByLabelText('Uploaded image')).toHaveLength(1);
    });
});

const LONG_TEXT =
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
