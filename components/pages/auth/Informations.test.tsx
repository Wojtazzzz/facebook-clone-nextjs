import { Informations } from '@components/pages/auth/Informations';
import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';

describe('Informations component', () => {
    it('have link to original facebook app', () => {
        renderWithDefaultData(<Informations />);

        const facebookLink = screen.getByTestId('informations-facebook_link');

        expect(facebookLink).toHaveAttribute('href', 'https://facebook.com/');
    });

    it('have link to github repo', () => {
        renderWithDefaultData(<Informations />);

        const githubLink = screen.getByTestId('informations-github_link');

        expect(githubLink).toHaveAttribute('href', 'https://github.com/CubeStorm');
    });
});
