import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { HiddenOptions } from './HiddenOptions';

describe('HiddenOptions component', () => {
    it('render unhide option', () => {
        renderWithDefaultData(<HiddenOptions postId={1} />);

        const unhideOption = screen.getByLabelText('Unhide');

        expect(unhideOption).toBeInTheDocument();
    });
});
