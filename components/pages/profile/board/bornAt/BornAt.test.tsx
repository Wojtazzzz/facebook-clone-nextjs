import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { BornAt } from './BornAt';
import RootUserJson from '@mocks/user/root.json';
import { screen } from '@testing-library/react';

describe('BornAt component', () => {
    it('render share button', () => {
        renderWithDefaultData(<BornAt user={RootUserJson} />);

        const shareButton = screen.getByLabelText('Share born');

        expect(shareButton).toBeInTheDocument();
    });

    it('render born image', () => {
        renderWithDefaultData(<BornAt user={RootUserJson} />);

        const img = screen.getByTestId('born-img');

        expect(img).toBeInTheDocument();
    });

    it('render correct born date', () => {
        renderWithDefaultData(<BornAt user={RootUserJson} />);

        const date = screen.getByText(`Born on ${RootUserJson.born_at}`);

        expect(date).toBeInTheDocument();
    });
});
