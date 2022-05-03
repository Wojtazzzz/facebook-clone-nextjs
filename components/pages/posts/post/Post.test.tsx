import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { Post } from '@components/pages/posts/post/Post';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';

describe('Post component', () => {
    it('render like, comment and share buttons', () => {
        const post = PostsFirstPageJson[0];

        renderWithDefaultData(<Post {...post} />);

        const likeButton = screen.getByLabelText('Like');
        const commentButton = screen.getByLabelText('Comment');
        const shareButton = screen.getByLabelText('Share');

        expect(likeButton).toBeInTheDocument();
        expect(commentButton).toBeInTheDocument();
        expect(shareButton).toBeInTheDocument();
    });
});
