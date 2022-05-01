import { EmptyList } from '@components/inc/EmptyList';
import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';

describe('EmptyList component', () => {
    it('renders image and title properly', () => {
        renderWithDefaultData(<EmptyList title="Custom title" />);

        const title = screen.getByText('Custom title');
        const image = screen.getByAltText('List is empty');

        expect(title).toBeVisible();
        expect(image).toBeVisible();
    });
});
