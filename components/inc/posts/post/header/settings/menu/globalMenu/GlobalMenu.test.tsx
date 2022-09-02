import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { GlobalMenu } from './GlobalMenu';

describe('GlobalMenu component', () => {
    it('render report option which is disabled', () => {
        renderWithDefaultData(<GlobalMenu />);

        const reportOption = screen.getByLabelText('Report');

        expect(reportOption).toBeInTheDocument();
    });
});
