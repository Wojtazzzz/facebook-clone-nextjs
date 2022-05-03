import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Stats } from '@components/pages/posts/post/Stats';

describe('Stats component', () => {
    it('display properly like number', () => {
        renderWithDefaultData(<Stats likesCount={20} commentsCount={7} />);

        const likesText = screen.getByText('20', { selector: 'span' });

        expect(likesText).toBeInTheDocument();
    });

    // to change when comments will be added
    it('display properly comments number', () => {
        renderWithDefaultData(<Stats likesCount={20} commentsCount={7} />);

        const likesText = screen.getByText('7 comments', { selector: 'span' });

        expect(likesText).toBeInTheDocument();
    });
});
