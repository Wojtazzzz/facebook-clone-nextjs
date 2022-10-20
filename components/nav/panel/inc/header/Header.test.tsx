import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header component', () => {
    it('render properly title', () => {
        const mockClose = jest.fn();

        renderWithDefaultData(<Header title="Test title" close={mockClose} />);

        const title = screen.getByText('Test title');

        expect(title).toBeInTheDocument();
    });
});
