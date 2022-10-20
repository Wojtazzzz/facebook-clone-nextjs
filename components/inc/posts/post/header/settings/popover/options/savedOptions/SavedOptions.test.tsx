import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { SavedOptions } from './SavedOptions';
import { getPostsQK } from '@utils/queryKeys';

describe('SavedOptions component', () => {
    const queryKey = getPostsQK({ type: 'all' });

    it('render unsave option', () => {
        renderWithDefaultData(<SavedOptions postId={1} queryKey={queryKey} />);

        const unsaveOption = screen.getByLabelText('Unsave');

        expect(unsaveOption).toBeInTheDocument();
    });
});
