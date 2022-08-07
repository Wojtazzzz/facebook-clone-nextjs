import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { OwnMenu } from '@components/pages/posts/post/header/settings/menu/ownMenu/OwnMenu';
import { screen } from '@testing-library/react';

describe('OwnMenu component', () => {
    it('render delete option', () => {
        renderWithDefaultData(<OwnMenu postId={1} />);

        const deleteOption = screen.getByLabelText('Delete');

        expect(deleteOption).toBeInTheDocument();
    });
});
