import { screen, within } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Loader } from './Loader';

describe('Loader component', () => {
    it('render 10 loadings', () => {
        renderWithDefaultData(<Loader />);

        const loader = screen.getByTestId('friends-loader');
        const loadings = within(loader).getAllByTestId('loading');

        expect(loader).toBeInTheDocument();
        expect(loadings).toHaveLength(10);
    });
});
