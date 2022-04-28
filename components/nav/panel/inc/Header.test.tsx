import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Header } from '@components/nav/panel/inc/Header';
import { screen } from '@testing-library/react';

describe('Messenger/Notifications Header component', () => {
    it('renders with properly title', () => {
        renderWithDefaultData(<Header title="Messenger" />);

        const title = screen.getByText('Messenger');

        expect(title).toBeInTheDocument();
    });
});
