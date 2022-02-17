import { render, screen } from '@testing-library/react';

import { Logo } from '@components/nav/Logo';

describe('Logo', () => {
    it('Can redirect to /', () => {
        render(<Logo />);
        const link = screen.getByRole('link').closest('a');

        expect(link).toHaveAttribute('href', '/');
    });
});