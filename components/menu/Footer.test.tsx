import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Footer } from './Footer';

describe('footer component', () => {
    it('has link to github', () => {
        renderWithDefaultData(<Footer />);

        const link = screen.getByText('CubeStorm');

        expect(link).toHaveAttribute('href', 'https://github.com/CubeStorm/');
    });

    it('has properly text and year', () => {
        const year = new Date().getFullYear();

        renderWithDefaultData(<Footer />);

        const text = screen.getByText(`· No-Meta © ${year}`);

        expect(text).toBeInTheDocument();
    });
});
