import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { SavedMenu } from '@components/pages/posts/post/header/settings/menu/savedMenu/SavedMenu';
import { screen } from '@testing-library/react';

describe('SavedMenu component', () => {
    it('render unsave option', () => {
        renderWithDefaultData(<SavedMenu postId={1} />);

        const unsaveOption = screen.getByLabelText('Unsave');

        expect(unsaveOption).toBeInTheDocument();
    });
});
