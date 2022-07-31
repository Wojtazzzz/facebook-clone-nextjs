import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { GlobalMenu } from '@components/pages/posts/post/header/settings/menu/globalMenu/GlobalMenu';
import { screen } from '@testing-library/react';

describe('GlobalMenu component', () => {
    it('render report option which is disabled', () => {
        renderWithDefaultData(<GlobalMenu />);

        const reportOption = screen.getByLabelText('Report');

        expect(reportOption).toBeInTheDocument();
    });
});
