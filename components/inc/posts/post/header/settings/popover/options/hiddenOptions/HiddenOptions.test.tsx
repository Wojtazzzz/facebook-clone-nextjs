import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { HiddenOptions } from './HiddenOptions';
import { getPostsQK } from '@utils/queryKeys';

describe('HiddenOptions component', () => {
    const queryKey = getPostsQK({ type: 'all' });

    it('render unhide option', () => {
        renderWithDefaultData(<HiddenOptions postId={1} queryKey={queryKey} />);

        const unhideOption = screen.getByLabelText('Unhide');

        expect(unhideOption).toBeInTheDocument();
    });
});
