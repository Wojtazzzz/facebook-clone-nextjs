import { mock } from '@libs/nock';
import RootUserJson from '@mocks/user/root.json';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Form } from './Form';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { generateFile } from '@utils/tests/generateFile';

describe('Form component', () => {
    const user = userEvent.setup();

    jest.setTimeout(30000);

    beforeEach(() => {
        mock({
            path: '/api/user',
            data: RootUserJson,
        });
    });

    it('render too short text validation message', async () => {
        const mockCloseModal = jest.fn();

        renderWithDefaultData(
            <Form
                queryKey={['posts', 'all']}
                postId={1}
                content="Test content"
                images={[]}
                closeModal={mockCloseModal}
            />
        );

        const input = screen.getByLabelText('Post content');
        const submitButton = screen.getByLabelText('Update post');

        await user.clear(input);
        await user.type(input, 'f');
        await user.click(submitButton);

        const tooShortValidationMessage = await screen.findByText('Post must be at least 2 characters');

        expect(tooShortValidationMessage).toBeInTheDocument();
    });

    it('render too long text validation message', async () => {
        const mockCloseModal = jest.fn();

        renderWithDefaultData(
            <Form
                queryKey={['posts', 'all']}
                postId={1}
                content="Test content"
                images={[]}
                closeModal={mockCloseModal}
            />
        );

        const submitButton = screen.getByLabelText('Update post');
        const input = screen.getByLabelText('Post content');

        await user.type(input, LONG_TEXT);
        await user.click(submitButton);

        const emptyPostValidationMessage = await screen.findByText('Post must be at most 1000 characters');

        expect(emptyPostValidationMessage).toBeInTheDocument();
    });

    it('can pass empty content', async () => {
        mock({
            path: '/api/posts/1',
            status: 201,
            method: 'post',
        });

        const mockCloseModal = jest.fn();

        renderWithDefaultData(
            <Form
                queryKey={['posts', 'all']}
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
                queryKey={['posts', 'all']}
                postId={1}
                content="Test content"
                images={[]}
                closeModal={mockCloseModal}
            />
        );

        const renderButton = screen.getByLabelText('Show files uploader');

        await user.click(renderButton);

        const inputFile = screen.getByLabelText('Images input');

        expect(inputFile).toBeInTheDocument();
    });

    it('render file name when file uploaded', async () => {
        const mockCloseModal = jest.fn();

        const file = generateFile('testImage.png', 'image/png');

        renderWithDefaultData(
            <Form
                queryKey={['posts', 'all']}
                postId={1}
                content="Test content"
                images={[]}
                closeModal={mockCloseModal}
            />
        );

        const renderButton = screen.getByLabelText('Show files uploader');
        await user.click(renderButton);

        const inputFile = screen.getByLabelText('Images input');
        await user.upload(inputFile, file);

        const displayedFileName = screen.getByText(file.name);

        expect(displayedFileName).toBeInTheDocument();
    });

    it('cannot upload file which is illicit', async () => {
        const mockCloseModal = jest.fn();

        const file = generateFile('testFile.pdf', 'application/pdf');

        renderWithDefaultData(
            <Form
                queryKey={['posts', 'all']}
                postId={1}
                content="Test content"
                images={[]}
                closeModal={mockCloseModal}
            />
        );

        const renderButton = screen.getByLabelText('Show files uploader');
        await user.click(renderButton);

        const inputFile = screen.getByLabelText('Images input');

        await user.upload(inputFile, file);

        const displayedFileName = screen.queryByText(file.name);

        expect(displayedFileName).not.toBeInTheDocument();
    });

    it('can upload multiple files', async () => {
        const mockCloseModal = jest.fn();

        const files = [
            generateFile('firstFile.png', 'image/png'),
            generateFile('secondFile.jpg', 'image/jpg'),
            generateFile('thirdFile.jpeg', 'image/jpeg'),
        ];

        renderWithDefaultData(
            <Form
                queryKey={['posts', 'all']}
                postId={1}
                content="Test content"
                images={[]}
                closeModal={mockCloseModal}
            />
        );

        const renderButton = screen.getByLabelText('Show files uploader');
        await user.click(renderButton);

        const inputFile = screen.getByLabelText('Images input');
        await user.upload(inputFile, files);

        const displayedFirstFileName = screen.getByText(files[0].name);
        const displayedSecondFileName = screen.getByText(files[1].name);
        const displayedThirdFileName = screen.getByText(files[2].name);

        expect(displayedFirstFileName).toBeInTheDocument();
        expect(displayedSecondFileName).toBeInTheDocument();
        expect(displayedThirdFileName).toBeInTheDocument();
    });

    it('can remove file from uploaded files list', async () => {
        const mockCloseModal = jest.fn();

        const files = [
            generateFile('firstFile.png', 'image/png'),
            generateFile('secondFile.jpg', 'image/jpg'),
            generateFile('thirdFile.jpeg', 'image/jpeg'),
        ];

        renderWithDefaultData(
            <Form
                queryKey={['posts', 'all']}
                postId={1}
                content="Test content"
                images={[]}
                closeModal={mockCloseModal}
            />
        );

        const renderButton = screen.getByLabelText('Show files uploader');
        await user.click(renderButton);

        const inputFile = screen.getByLabelText('Images input');

        await user.upload(inputFile, files);

        const removeSecondFileButton = screen.getByLabelText(`Remove ${files[1].name} from updated files list`);

        const displayedSecondFileName = screen.getByText(files[1].name);

        expect(displayedSecondFileName).toBeInTheDocument();

        await user.click(removeSecondFileButton);

        expect(displayedSecondFileName).not.toBeInTheDocument();
    });

    it('removing one file cannot remove another file(s) from list', async () => {
        const mockCloseModal = jest.fn();

        const files = [
            generateFile('firstFile.png', 'image/png'),
            generateFile('secondFile.jpg', 'image/jpg'),
            generateFile('thirdFile.jpeg', 'image/jpeg'),
        ];

        renderWithDefaultData(
            <Form
                queryKey={['posts', 'all']}
                postId={1}
                content="Test content"
                images={[]}
                closeModal={mockCloseModal}
            />
        );

        const renderButton = screen.getByLabelText('Show files uploader');
        await user.click(renderButton);

        const inputFile = screen.getByLabelText('Images input');

        await user.upload(inputFile, files);

        const removeSecondFileButton = screen.getByLabelText(`Remove ${files[1].name} from updated files list`);

        await user.click(removeSecondFileButton);

        await waitFor(() => {
            const displayedFirstFileName = screen.queryByText(files[0].name);
            expect(displayedFirstFileName).toBeInTheDocument();
        });

        await waitFor(() => {
            const displayedSecondFileName = screen.queryByText(files[0].name);
            expect(displayedSecondFileName).toBeInTheDocument();
        });

        await waitFor(() => {
            const displayedThirdFileName = screen.queryByText(files[0].name);
            expect(displayedThirdFileName).toBeInTheDocument();
        });
    });

    it('render properly count of uploaded files', async () => {
        const mockCloseModal = jest.fn();

        const files = [
            generateFile('firstFile.png', 'image/png'),
            generateFile('secondFile.jpg', 'image/jpg'),
            generateFile('thirdFile.jpeg', 'image/jpeg'),
            generateFile('fourthFile.jpeg', 'image/gif'),
            generateFile('fivethFile.jpeg', 'image/webp'),
        ];

        renderWithDefaultData(
            <Form
                queryKey={['posts', 'all']}
                postId={1}
                content="Test content"
                images={[]}
                closeModal={mockCloseModal}
            />
        );

        const renderButton = screen.getByLabelText('Show files uploader');
        await user.click(renderButton);

        const inputFile = screen.getByLabelText('Images input');

        await user.upload(inputFile, files);

        const count = screen.getByText(`Uploaded files: ${files.length}`);

        expect(count).toBeInTheDocument();
    });

    it('list of uploaded files render properly count of images', async () => {
        const mockCloseModal = jest.fn();

        renderWithDefaultData(
            <Form
                queryKey={['posts', 'all']}
                postId={1}
                content="Test content"
                images={['/posts/firstFile.png', '/posts/secondFile.jpg']}
                closeModal={mockCloseModal}
            />
        );

        const listOfUploadedFiles = screen.getAllByLabelText('Uploaded image');

        expect(listOfUploadedFiles).toHaveLength(2);
    });

    it('can remove file from uploaded', async () => {
        const mockCloseModal = jest.fn();

        renderWithDefaultData(
            <Form
                queryKey={['posts', 'all']}
                postId={1}
                content="Test content"
                images={['/posts/firstFile.png', '/posts/secondFile.jpg']}
                closeModal={mockCloseModal}
            />
        );

        const listOfUploadedFiles = screen.getAllByLabelText('Uploaded image');

        expect(listOfUploadedFiles).toHaveLength(2);

        const removeButton = screen.getAllByLabelText('Remove file');

        await user.click(removeButton[0]);

        expect(screen.getAllByLabelText('Uploaded image')).toHaveLength(1);
    });
});

const LONG_TEXT =
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
