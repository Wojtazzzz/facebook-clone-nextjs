import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Settings } from './Settings';
import RootUserJson from '@mocks/user/root.json';
import { mock } from '@utils/nock';
import { mockResizeObserver } from '@utils/tests/mockResizeObserver';
import { getPostsQK } from '@utils/queryKeys';

describe('Settings component tests', () => {
    const mockOpenUpdateModal = jest.fn();
    const queryKey = getPostsQK({ type: 'all' });
    const user = userEvent.setup();
    const type = {
        is_own: true,
        is_hidden: false,
        is_saved: false,
    };

    beforeEach(() => {
        mockResizeObserver();

        mock({
            path: '/api/user',
            data: RootUserJson,
        });
    });

    it('open menu when click on button', async () => {
        renderWithDefaultData(
            <Settings
                postId={1}
                type={type}
                commenting={true}
                queryKey={queryKey}
                openUpdateModal={mockOpenUpdateModal}
            />
        );

        const button = screen.getByLabelText('Show post settings');
        await user.click(button);

        const menu = await screen.findByLabelText('Settings');

        expect(menu).toBeInTheDocument();
    });

    it('always render global menu', async () => {
        renderWithDefaultData(
            <Settings
                postId={1}
                type={type}
                commenting={true}
                queryKey={queryKey}
                openUpdateModal={mockOpenUpdateModal}
            />
        );

        const button = screen.getByLabelText('Show post settings');
        await user.click(button);

        const option = screen.getByLabelText('Report');

        expect(option).toBeInTheDocument();
    });
});
