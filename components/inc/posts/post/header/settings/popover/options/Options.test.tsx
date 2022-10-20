import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { Options } from './Options';
import { mock } from '@utils/nock';
import RootUserJson from '@mocks/user/root.json';
import { getPostsQK } from '@utils/queryKeys';

describe('Options component tests', () => {
    const queryKey = getPostsQK({ type: 'all' });
    const mockOpenUpdateModal = jest.fn();

    it("render options for friend's post when is_own is false type passed", async () => {
        const mockClose = jest.fn();

        const type = {
            is_own: false,
            is_saved: false,
            is_hidden: false,
        };

        renderWithDefaultData(
            <Options
                postId={1}
                type={type}
                commenting={true}
                queryKey={queryKey}
                openUpdateModal={mockOpenUpdateModal}
                close={mockClose}
            />
        );

        const option = await screen.findByLabelText('Hide');

        expect(option).toBeInTheDocument();
    });

    it('render options for hidden post when is_hidden is true type passed', async () => {
        const mockClose = jest.fn();

        const type = {
            is_own: false,
            is_saved: false,
            is_hidden: true,
        };

        renderWithDefaultData(
            <Options
                postId={1}
                type={type}
                commenting={true}
                queryKey={queryKey}
                openUpdateModal={mockOpenUpdateModal}
                close={mockClose}
            />
        );

        const option = await screen.findByLabelText('Unhide');

        expect(option).toBeInTheDocument();
    });

    it('render options for saved post when is_saved is true type passed', async () => {
        const mockClose = jest.fn();

        const type = {
            is_own: false,
            is_saved: true,
            is_hidden: false,
        };

        renderWithDefaultData(
            <Options
                postId={1}
                type={type}
                commenting={true}
                queryKey={queryKey}
                openUpdateModal={mockOpenUpdateModal}
                close={mockClose}
            />
        );

        const option = await screen.findByLabelText('Unsave');

        expect(option).toBeInTheDocument();
    });

    it('render options for own post when is_own true type passed', async () => {
        const mockClose = jest.fn();

        const type = {
            is_own: true,
            is_saved: false,
            is_hidden: false,
        };

        mock({
            path: '/api/user',
            data: RootUserJson,
        });

        renderWithDefaultData(
            <Options
                postId={1}
                type={type}
                commenting={true}
                queryKey={queryKey}
                openUpdateModal={mockOpenUpdateModal}
                close={mockClose}
            />
        );

        const option = await screen.findByLabelText('Delete');

        expect(option).toBeInTheDocument();
    });
});
