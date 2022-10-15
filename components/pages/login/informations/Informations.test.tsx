import { Informations } from '@components/pages/login/informations/Informations';
import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';

describe('Informations component', () => {
    it('render header info', () => {
        renderWithDefaultData(<Informations />);

        const header = screen.getByRole('heading');

        expect(header).toHaveTextContent(
            process.env.NEXT_PUBLIC_APP_NAME ?? 'this-string-will-throw-error-when-no-env-set'
        );
    });

    it('render about info', () => {
        renderWithDefaultData(<Informations />);

        const about = screen.getByTestId('informations-facebook_link');

        expect(about).toBeInTheDocument();
    });

    it('render github info', () => {
        renderWithDefaultData(<Informations />);

        const githubLink = screen.getByTestId('informations-github_link');

        expect(githubLink).toHaveAttribute('href', 'https://github.com/CubeStorm');
    });
});
