import { mock } from '@libs/nock';
import RootUserJson from '@mocks/user/root.json';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Form } from '@components/inc/modals/createPost/form/Form';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { generateFile } from '@utils/generateFile';
import nock from 'nock';
import { wait } from '@testing-library/user-event/dist/types/utils';

describe('Form component', () => {
    jest.setTimeout(30000);

    beforeEach(() => {
        nock.disableNetConnect();
        nock.cleanAll();

        mock('/api/user', 200, RootUserJson);
        mock('/api/posts?page=1', 200, PostsFirstPageJson);
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it('show too short text validation message', async () => {
        const user = userEvent.setup();

        renderWithDefaultData(<Form />);

        const input = screen.getByLabelText('Post content');
        const submitButton = screen.getByLabelText('Create post');

        await user.type(input, 'f');
        await user.click(submitButton);

        const tooShortValidationMessage = await screen.findByText('Post must be at least 2 characters');

        expect(tooShortValidationMessage).toBeInTheDocument();
    });

    it('show too long text validation message', async () => {
        const user = userEvent.setup();

        renderWithDefaultData(<Form />);

        const submitButton = screen.getByLabelText('Create post');
        const input = screen.getByLabelText('Post content');

        await user.type(input, LONG_TEXT);
        await user.click(submitButton);

        const emptyPostValidationMessage = await screen.findByText('Post must be at most 1000 characters');

        expect(emptyPostValidationMessage).toBeInTheDocument();
    });

    it('show empty post validation message', async () => {
        const user = userEvent.setup();

        renderWithDefaultData(<Form />);

        const submitButton = screen.getByLabelText('Create post');
        await user.click(submitButton);

        const emptyPostValidationMessage = await screen.findByText('Post must contain text or image(s)');

        expect(emptyPostValidationMessage).toBeInTheDocument();
    });

    it('show loader when request called', async () => {
        mock('/api/posts', 201, {}, 'post');
        const user = userEvent.setup();

        renderWithDefaultData(<Form />);

        const input = screen.getByLabelText('Post content');
        const submitButton = screen.getByLabelText('Create post');

        await user.type(input, 'Test Post');
        await user.click(submitButton);

        const loader = screen.getByTestId('createPost-loader');

        expect(loader).toBeInTheDocument();
    });

    it('show input file when click on show button', async () => {
        const user = userEvent.setup();

        renderWithDefaultData(<Form />);

        const showButton = screen.getByLabelText('Show input file');

        await user.click(showButton);

        const inputFile = screen.getByLabelText('Images input');

        expect(inputFile).toBeInTheDocument();
    });

    it('show file name when file uploaded', async () => {
        const user = userEvent.setup();
        const file = generateFile('testImage.png', 'image/png');

        renderWithDefaultData(<Form />);

        const showButton = screen.getByLabelText('Show input file');
        await user.click(showButton);

        const inputFile = screen.getByLabelText('Images input');
        await user.upload(inputFile, file);

        const displayedFileName = screen.getByText(file.name);

        expect(displayedFileName).toBeInTheDocument();
    });

    it('cannot upload file which is illicit', async () => {
        const user = userEvent.setup();
        const file = generateFile('testFile.pdf', 'application/pdf');

        renderWithDefaultData(<Form />);

        const showButton = screen.getByLabelText('Show input file');
        await user.click(showButton);

        const inputFile = screen.getByLabelText('Images input');

        await user.upload(inputFile, file);

        const displayedFileName = screen.queryByText(file.name);

        expect(displayedFileName).not.toBeInTheDocument();
    });

    it('can upload multiple files', async () => {
        const user = userEvent.setup();
        const files = [
            generateFile('firstFile.png', 'image/png'),
            generateFile('secondFile.jpg', 'image/jpg'),
            generateFile('thirdFile.jpeg', 'image/jpeg'),
        ];

        mock('/api/posts', 201, {}, 'post');

        renderWithDefaultData(<Form />);

        const showButton = screen.getByLabelText('Show input file');
        await user.click(showButton);

        const inputFile = screen.getByLabelText('Images input');
        await user.upload(inputFile, files);

        const displayedFirstFileName = screen.getByText(files[0].name);
        const displayedSecondFileName = screen.getByText(files[1].name);
        const displayedThirdFileName = screen.getByText(files[2].name);

        expect(displayedFirstFileName).toBeInTheDocument();
        expect(displayedSecondFileName).toBeInTheDocument();
        expect(displayedThirdFileName).toBeInTheDocument();

        const submitButton = screen.getByLabelText('Create post');
        await user.click(submitButton);

        const errors = screen.queryByTestId('post-validation');

        expect(errors).toHaveTextContent('');
    });

    it('can remove file from uploaded files list', async () => {
        const user = userEvent.setup();
        const files = [
            generateFile('firstFile.png', 'image/png'),
            generateFile('secondFile.jpg', 'image/jpg'),
            generateFile('thirdFile.jpeg', 'image/jpeg'),
        ];

        renderWithDefaultData(<Form />);

        const showButton = screen.getByLabelText('Show input file');
        await user.click(showButton);

        const inputFile = screen.getByLabelText('Images input');

        await user.upload(inputFile, files);

        const removeSecondFileButton = screen.getByLabelText(`Remove ${files[1].name} from updated files list`);

        const displayedSecondFileName = screen.getByText(files[1].name);

        expect(displayedSecondFileName).toBeInTheDocument();

        await user.click(removeSecondFileButton);

        expect(displayedSecondFileName).not.toBeInTheDocument();
    });

    it('removing one file cannot remove another file(s) from list', async () => {
        const user = userEvent.setup();
        const files = [
            generateFile('firstFile.png', 'image/png'),
            generateFile('secondFile.jpg', 'image/jpg'),
            generateFile('thirdFile.jpeg', 'image/jpeg'),
        ];

        renderWithDefaultData(<Form />);

        const showButton = screen.getByLabelText('Show input file');
        await user.click(showButton);

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

    it('show properly count of uploaded files', async () => {
        const user = userEvent.setup();
        const files = [
            generateFile('firstFile.png', 'image/png'),
            generateFile('secondFile.jpg', 'image/jpg'),
            generateFile('thirdFile.jpeg', 'image/jpeg'),
            generateFile('fourthFile.jpeg', 'image/gif'),
            generateFile('fivethFile.jpeg', 'image/webp'),
        ];

        renderWithDefaultData(<Form />);

        const showButton = screen.getByLabelText('Show input file');
        await user.click(showButton);

        const inputFile = screen.getByLabelText('Images input');

        await user.upload(inputFile, files);

        const count = screen.getByText(`Uploaded files: ${files.length}`);

        expect(count).toBeInTheDocument();
    });
});

const LONG_TEXT =
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
