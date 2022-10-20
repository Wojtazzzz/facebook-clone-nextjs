import { screen, within } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Loader } from './Loader';

describe('Loader component', () => {
    it('render 6 loaders', () => {
        renderWithDefaultData(<Loader />);

        const loader = screen.getByTestId('friends-loader');
        const loaders = within(loader).getAllByTestId('loading');

        expect(loader).toBeInTheDocument();
        expect(loaders).toHaveLength(6);
    });
});
