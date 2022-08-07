import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header component', () => {
    it('render properly title', () => {
        renderWithDefaultData(<Header title="Test title" />);

        const title = screen.getByText('Test title');

        expect(title).toBeInTheDocument();
    });
});
