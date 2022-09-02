import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import userEvent from '@testing-library/user-event';
import { mock } from '@libs/nock';
import { mockResizeObserver } from '@utils/tests/mockResizeObserver';
import { Likes } from './Likes';
import MoreLikeJson from '@mocks/posts/likes/moreLikes.json';

describe('Likes component', () => {
    mockResizeObserver();

    const user = userEvent.setup();

    it('display properly count', () => {
        renderWithDefaultData(<Likes postId={1} count={3} />);

        const count = screen.getByTestId('post-likesCount');
        expect(count).toHaveTextContent('3');
    });

    it('not display tooltip by default', () => {
        renderWithDefaultData(<Likes postId={1} count={3} />);

        const tooltip = screen.queryByTestId('tooltip');
        expect(tooltip).not.toBeInTheDocument();
    });

    it('display tooltip when hover on count element', async () => {
        mock({
            path: '/api/posts/1/likes',
            data: MoreLikeJson,
        });

        renderWithDefaultData(<Likes postId={1} count={3} />);

        const count = screen.getByTestId('post-likesCount');
        await user.hover(count);

        const tooltip = await screen.findAllByTestId('tooltip');

        expect(tooltip[0]).toBeInTheDocument();
    });

    it('tooltip has properly header', async () => {
        mock({
            path: '/api/posts/1/likes',
            data: MoreLikeJson,
        });

        renderWithDefaultData(<Likes postId={1} count={3} />);

        const count = screen.getByTestId('post-likesCount');
        await user.hover(count);

        const tooltip = await screen.findAllByTestId('tooltip');

        expect(tooltip[0]).toBeInTheDocument();
    });

    it('render "and xxx more..." when fetched more than 12 likes', async () => {
        mock({
            path: '/api/posts/1/likes',
            data: MoreLikeJson,
        });

        renderWithDefaultData(<Likes postId={1} count={3} />);

        const count = screen.getByTestId('post-likesCount');
        await user.hover(count);

        const text = await screen.findAllByText(`and ${MoreLikeJson.length - 12} more...`);

        expect(text[0]).toBeInTheDocument();
    });

    it('render ApiError when response return error', async () => {
        mock({
            path: '/api/posts/1/likes',
            status: 500,
        });

        renderWithDefaultData(<Likes postId={1} count={3} />);

        const count = screen.getByTestId('post-likesCount');
        await user.hover(count);

        const error = await screen.findAllByTestId('tooltip-apiError');

        expect(error[0]).toBeInTheDocument();
    });

    it('render EmptyList when response return empty data', async () => {
        mock({
            path: '/api/posts/1/likes',
            data: [],
        });

        renderWithDefaultData(<Likes postId={1} count={3} />);

        const count = screen.getByTestId('post-likesCount');
        await user.hover(count);

        const emptyList = await screen.findAllByTestId('tooltip-emptyList');

        expect(emptyList[0]).toBeInTheDocument();
    });

    it('render properly users name', async () => {
        mock({
            path: '/api/posts/1/likes',
            data: MoreLikeJson,
        });

        renderWithDefaultData(<Likes postId={1} count={3} />);

        const count = screen.getByTestId('post-likesCount');
        await user.hover(count);

        const first = await screen.findAllByText(MoreLikeJson[0].author.name);
        const second = await screen.findAllByText(MoreLikeJson[1].author.name);
        const third = await screen.findAllByText(MoreLikeJson[2].author.name);

        expect(first[0]).toBeInTheDocument();
        expect(second[0]).toBeInTheDocument();
        expect(third[0]).toBeInTheDocument();
    });
});
