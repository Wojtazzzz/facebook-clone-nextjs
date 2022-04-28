import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { EmptyList } from '@components/nav/panel/inc/EmptyList';

describe('Messenger/Notifications EmptyList component', () => {
    it('renders with properly title and image', () => {
        renderWithDefaultData(<EmptyList title="Messenger" />);

        const title = screen.getByText('Messenger');
        const image = screen.getByAltText('List is empty');

        expect(title).toBeInTheDocument();
        expect(image).toBeVisible();
    });
});
