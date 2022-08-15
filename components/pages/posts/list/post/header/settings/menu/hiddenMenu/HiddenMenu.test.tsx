import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { HiddenMenu } from './HiddenMenu';

describe('HiddenMenu component', () => {
    it('render unhide option', () => {
        renderWithDefaultData(<HiddenMenu postId={1} />);

        const unhideOption = screen.getByLabelText('Unhide');

        expect(unhideOption).toBeInTheDocument();
    });
});
