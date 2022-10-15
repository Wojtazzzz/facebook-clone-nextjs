import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Footer } from './Footer';

describe('Footer component', () => {
    it('has link to github', () => {
        renderWithDefaultData(<Footer />);

        const link = screen.getByText('Marcin Witas');

        expect(link).toHaveAttribute('href', 'https://github.com/CubeStorm/');
    });

    it('has properly year', () => {
        const year = new Date().getFullYear();

        renderWithDefaultData(<Footer />);

        const text = screen.getByText(year, { exact: false });

        expect(text).toBeInTheDocument();
    });
});
