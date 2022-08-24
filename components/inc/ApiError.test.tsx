import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { ApiError } from '@components/inc/ApiError';
import { screen } from '@testing-library/react';

describe('ApiError component', () => {
    it('render image and text properly', () => {
        renderWithDefaultData(<ApiError />);

        const image = screen.getByAltText('Server error');
        const textFirstLine = screen.getByText('Something went wrong');
        const textSecondLine = screen.getByText('Please try again later');

        expect(image).toBeVisible();
        expect(textFirstLine).toBeVisible();
        expect(textSecondLine).toBeVisible();
    });
});
