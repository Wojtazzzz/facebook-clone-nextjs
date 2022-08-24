import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { OwnMenu } from './OwnMenu';

describe('OwnMenu component', () => {
    it('render delete option', () => {
        renderWithDefaultData(<OwnMenu postId={1} />);

        const deleteOption = screen.getByLabelText('Delete');

        expect(deleteOption).toBeInTheDocument();
    });
});
