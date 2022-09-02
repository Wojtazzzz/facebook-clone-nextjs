import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { SavedOptions } from './SavedOptions';

describe('SavedOptions component', () => {
    it('render unsave option', () => {
        renderWithDefaultData(<SavedOptions postId={1} />);

        const unsaveOption = screen.getByLabelText('Unsave');

        expect(unsaveOption).toBeInTheDocument();
    });
});
