import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { SavedMenu } from './SavedMenu';

describe('SavedMenu component', () => {
    it('render unsave option', () => {
        renderWithDefaultData(<SavedMenu postId={1} />);

        const unsaveOption = screen.getByLabelText('Unsave');

        expect(unsaveOption).toBeInTheDocument();
    });
});
