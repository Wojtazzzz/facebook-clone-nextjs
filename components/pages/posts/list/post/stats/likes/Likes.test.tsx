import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import userEvent from '@testing-library/user-event';
import { mock } from '@libs/nock';
import { mockResizeObserver } from '@utils/mockResizeObserver';
import { Likes } from './Likes';

describe('Likes component', () => {
    mockResizeObserver();

    beforeEach(() => {
        mock({
            path: `/api/posts/1/likes`,
        });
    });

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

    it('display tooltip when hover on count element', async () => {
        const user = userEvent.setup();
        renderWithDefaultData(<Likes postId={1} count={3} />);

        const count = screen.getByTestId('post-likes_count');
        await user.hover(count);

        const tooltip = await screen.findAllByTestId('post-likesTooltip');

        expect(tooltip[0]).toBeInTheDocument();
    });

    it('Tooltip has properly header', async () => {
        const user = userEvent.setup();
        renderWithDefaultData(<Likes postId={1} count={3} />);

        const count = screen.getByTestId('post-likes_count');
        await user.hover(count);

        const tooltip = await screen.findAllByTestId('post-likesTooltip');

        expect(tooltip[0]).toBeInTheDocument();
    });
});
