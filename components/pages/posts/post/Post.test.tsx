import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { Post } from '@components/pages/posts/post/Post';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';

describe('Post component', () => {
    const post = PostsFirstPageJson[0];

    it('render like, comment and share buttons', () => {
        renderWithDefaultData(<Post {...post} />);

        const likeButton = screen.getByLabelText('Like');
        const commentButton = screen.getByLabelText('Comment');
        const shareButton = screen.getByLabelText('Share');

        expect(likeButton).toBeInTheDocument();
        expect(commentButton).toBeInTheDocument();
        expect(shareButton).toBeInTheDocument();
    });

    it('not show comments section by default', async () => {
        renderWithDefaultData(<Post {...post} />);

        const commentsSection = screen.queryByLabelText('Post comments', { selector: 'section' });

        expect(commentsSection).not.toBeInTheDocument();
    });

    it('show comments section when click on button', async () => {
        renderWithDefaultData(<Post {...post} />);

        const commentButton = screen.getByLabelText('Comment');
        commentButton.click();

        const commentsSection = screen.queryByLabelText('Post comments', { selector: 'section' });
        expect(commentsSection).toBeInTheDocument();
    });

    it('show comments section when click on comments stats', async () => {
        renderWithDefaultData(<Post {...post} />);

        const commentStats = screen.getByText(`${post.comments_count} comments`);
        commentStats.click();

        const commentsSection = screen.queryByLabelText('Post comments', { selector: 'section' });
        expect(commentsSection).toBeInTheDocument();
    });

    it('show loaders before comments section', async () => {
        renderWithDefaultData(<Post {...post} />);

        const commentStats = screen.getByText(`${post.comments_count} comments`);
        commentStats.click();

        const commentsSection = screen.queryByLabelText('Post comments', { selector: 'section' });
        expect(commentsSection).toBeInTheDocument();
    });
});
