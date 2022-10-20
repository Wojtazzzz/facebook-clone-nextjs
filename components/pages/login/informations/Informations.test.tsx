import { Informations } from '@components/pages/login/informations/Informations';
import { screen } from '@testing-library/react';
import { APP_NAME } from '@utils/env';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';

describe('Informations component tests', () => {
    it('render header info', () => {
        renderWithDefaultData(<Informations />);

        const header = screen.getByRole('heading');

        expect(header).toHaveTextContent(APP_NAME);
    });

    it('render github info', () => {
        renderWithDefaultData(<Informations />);

        const githubLink = screen.getByTestId('informations-github_link');

        expect(githubLink).toHaveAttribute('href', 'https://github.com/CubeStorm');
    });
});
