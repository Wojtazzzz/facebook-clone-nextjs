import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { FriendOptions } from './FriendOptions';
import { getPostsQK } from '@utils/queryKeys';

describe('FriendOptions component tests', () => {
    const queryKey = getPostsQK({ type: 'all' });
    const mockCloseMenu = jest.fn();

    it('render hide and save options', () => {
        renderWithDefaultData(<FriendOptions postId={1} queryKey={queryKey} closeMenu={mockCloseMenu} />);

        const hideOption = screen.getByLabelText('Hide');
        const saveOption = screen.getByLabelText('Save');

        expect(hideOption).toBeInTheDocument();
        expect(saveOption).toBeInTheDocument();
    });
});
