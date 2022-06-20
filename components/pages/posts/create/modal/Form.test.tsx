import { mock } from '@libs/nock';
import RootUserJson from '@mocks/user/root.json';
import CreateSuccessResponseJson from '@mocks/posts/actions/createPostSuccess.json';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Form } from '@components/pages/posts/create/modal/Form';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';

describe('Form component', () => {
    jest.setTimeout(30000);

    beforeEach(() => {
        nock.cleanAll();

        mock('/api/user', 200, RootUserJson);
        mock('/api/posts?page=1', 200, PostsFirstPageJson);
        mock('/api/posts?page=1', 200, PostsFirstPageJson);
    });

    it('show too short text validation message', async () => {
        const user = userEvent.setup();

        renderWithDefaultData(<Form />);

        const input = await screen.findByLabelText('Post content');
        const submitButton = screen.getByLabelText('Create post');

        await user.type(input, 'f');
        await user.click(submitButton);

        const tooShortValidationMessage = await screen.findByText('Post must be at least 2 characters');

        expect(tooShortValidationMessage).toBeInTheDocument();
    });

    it('show too long text validation message', async () => {
        jest.setTimeout(15000);

        const user = userEvent.setup();

        renderWithDefaultData(<Form />);

        const submitButton = screen.getByLabelText('Create post');
        const input = await screen.findByLabelText('Post content');

        await user.type(input, LONG_TEXT);
        await user.click(submitButton);

        const emptyPostValidationMessage = await screen.findByText('Post must be at most 1000 characters');

        expect(emptyPostValidationMessage).toBeInTheDocument();

        jest.setTimeout(5000);
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
        mock('/api/posts', 201, CreateSuccessResponseJson, 'post');
        const user = userEvent.setup();

        renderWithDefaultData(<Form />);

        await waitFor(async () => {
            const submitButton = screen.getByLabelText('Create post');
            const input = await screen.findByLabelText('Post content');

            await user.type(input, 'Test Post');
            await user.click(submitButton);
        });

        const loader = screen.getByTestId('createPost-loader');

        expect(loader).toBeInTheDocument();
    });

    it('show api error component when post was not created', async () => {
        mock('/api/posts', 500, {}, 'post');
        const user = userEvent.setup();

        renderWithDefaultData(<Form />);

        const submitButton = screen.getByLabelText('Create post');
        const input = await screen.findByLabelText('Post content');

        await user.type(input, 'Test Post');
        submitButton.click();

        const errorComponent = await screen.findByText('Something went wrong');

        expect(errorComponent).toBeInTheDocument();
    });

    it('show error component when post was not created because content is too large', async () => {
        mock('/api/posts', 413, {}, 'post');
        const user = userEvent.setup();

        renderWithDefaultData(<Form />);

        const submitButton = screen.getByLabelText('Create post');
        const input = await screen.findByLabelText('Post content');

        await user.type(input, 'Test Post');
        await user.click(submitButton);

        const errorComponent = await screen.findByText('Your content is too large');

        expect(errorComponent).toBeInTheDocument();
    });
});

const LONG_TEXT =
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
