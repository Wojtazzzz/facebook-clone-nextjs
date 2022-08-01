import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import userEvent from '@testing-library/user-event';
import { Likes } from '@components/pages/posts/post/stats/likes/Likes';
import { mock } from '@libs/nock';
import { mockResizeObserver } from '@utils/mockResizeObserver';

describe('Likes component', () => {
    mockResizeObserver();

    it('display properly count', () => {
        renderWithDefaultData(<Likes postId={1} count={3} />);

        const count = screen.getByTestId('post-likes_count');
        expect(count).toHaveTextContent('3');
    });

    it('not display tooltip by default', () => {
        renderWithDefaultData(<Likes postId={1} count={3} />);

        const tooltip = screen.queryByTestId('post-likesTooltip');
        expect(tooltip).not.toBeInTheDocument();
    });

    beforeEach(() => {
        mock('/api/posts/1/likes', 200, {});
    });

    it('display tooltip when hover on count element', async () => {
        const user = userEvent.setup();
        renderWithDefaultData(<Likes postId={1} count={3} />);

        const count = screen.getByTestId('post-likes_count');
        await user.hover(count);

        const tooltip = await screen.findAllByTestId('post-likesTooltip');

        expect(tooltip[0]).toBeInTheDocument();
    });

    it('Tooltip has properly header and ', async () => {
        const user = userEvent.setup();
        renderWithDefaultData(<Likes postId={1} count={3} />);

        const count = screen.getByTestId('post-likes_count');
        await user.hover(count);

        const tooltip = await screen.findAllByTestId('post-likesTooltip');

        expect(tooltip[0]).toBeInTheDocument();
    });
});
