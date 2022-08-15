import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import MoreLikesJson from '@mocks/posts/likes/moreLikes.json';
import LessLikesJson from '@mocks/posts/likes/lessLikes.json';
import { mock } from '@libs/nock';
import { AuthorsList } from './AuthorsList';
import { mockResizeObserver } from '@utils/mockResizeObserver';

describe('AuthorsList component', () => {
    mockResizeObserver();

    it('show spinner when data not loaded yet', () => {
        mock('/api/posts/1/likes', 200, MoreLikesJson);

        renderWithDefaultData(<AuthorsList postId={1} />);

        const spinner = screen.getByTestId('likes-spinner');
        expect(spinner).toBeInTheDocument();
    });

    it('show ApiError when response return error', async () => {
        mock('/api/posts/1/likes', 500);

        renderWithDefaultData(<AuthorsList postId={1} />);

        const error = await screen.findByTestId('likes-apiError');
        expect(error).toBeInTheDocument();
    });

    it('show "and x more..." when fetched more likes', async () => {
        mock('/api/posts/1/likes', 200, MoreLikesJson);

        renderWithDefaultData(<AuthorsList postId={1} />);

        const text = await screen.findByText('and 9 more...');
        expect(text).toBeInTheDocument();
    });

    it('render max 12 likes authors', async () => {
        mock('/api/posts/1/likes', 200, MoreLikesJson);

        renderWithDefaultData(<AuthorsList postId={1} />);

        const authors = await screen.findAllByLabelText('Like added by');
        expect(authors).toHaveLength(12);
    });

    it('dont show "and x more..." when 12 or less likes', () => {
        mock('/api/posts/1/likes', 200, LessLikesJson);

        renderWithDefaultData(<AuthorsList postId={1} />);

        const text = screen.queryByText('more...');
        expect(text).not.toBeInTheDocument();
    });
});
