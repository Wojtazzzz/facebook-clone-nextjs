import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { GlobalOptions } from './GlobalOptions';

describe('GlobalOptions component', () => {
    it('render report option which is disabled', () => {
        renderWithDefaultData(<GlobalOptions />);

        const reportOption = screen.getByLabelText('Report');

        expect(reportOption).toBeInTheDocument();
    });
});
