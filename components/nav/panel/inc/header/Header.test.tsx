import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header component tests', () => {
    const mockClose = jest.fn();

    it('render properly title', () => {
        renderWithDefaultData(<Header title="Test title" close={mockClose} />);

        const title = screen.getByText('Test title');

        expect(title).toBeInTheDocument();
    });
});
