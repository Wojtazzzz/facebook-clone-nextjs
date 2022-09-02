import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { Options } from './Options';
import { mock } from '@libs/nock';
import RootUserJson from '@mocks/user/root.json';

describe('Options component', () => {
    const mockClose = jest.fn();

    it("render options for friend's post when is_own is false type passed", async () => {
        const type = {
            is_own: false,
            is_saved: false,
            is_hidden: false,
        };

        renderWithDefaultData(<Options postId={1} commenting={true} type={type} close={mockClose} />);

        const option = await screen.findByLabelText('Hide');

        expect(option).toBeInTheDocument();
    });

    it('render options for hidden post when is_hidden is true type passed', async () => {
        const type = {
            is_own: false,
            is_saved: false,
            is_hidden: true,
        };

        renderWithDefaultData(<Options postId={1} commenting={true} type={type} close={mockClose} />);

        const option = await screen.findByLabelText('Unhide');

        expect(option).toBeInTheDocument();
    });

    it('render options for saved post when is_saved is true type passed', async () => {
        const type = {
            is_own: false,
            is_saved: true,
            is_hidden: false,
        };

        renderWithDefaultData(<Options postId={1} commenting={true} type={type} close={mockClose} />);

        const option = await screen.findByLabelText('Unsave');

        expect(option).toBeInTheDocument();
    });

    it('render options for own post when is_own true type passed', async () => {
        const type = {
            is_own: true,
            is_saved: false,
            is_hidden: false,
        };

        mock({
            path: '/api/user',
            data: RootUserJson,
        });

        renderWithDefaultData(<Options postId={1} commenting={true} type={type} close={mockClose} />);

        const option = await screen.findByLabelText('Delete');

        expect(option).toBeInTheDocument();
    });
});
