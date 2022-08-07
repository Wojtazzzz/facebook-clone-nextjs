import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { HiddenMenu } from '@components/pages/posts/post/header/settings/menu/hiddenMenu/HiddenMenu';
import { screen } from '@testing-library/react';

describe('HiddenMenu component', () => {
    it('render unhide option', () => {
        renderWithDefaultData(<HiddenMenu postId={1} />);

        const unhideOption = screen.getByLabelText('Unhide');

        expect(unhideOption).toBeInTheDocument();
    });
});
