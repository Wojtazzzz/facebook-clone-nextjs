import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Author } from './Author';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import PostEditedJson from '@mocks/posts/editedPost.json';
import { screen } from '@testing-library/react';

describe('Author component tests', () => {
    it('has link to user profile', () => {
        const post = PostsFirstPageJson.data[0];
        const author = post.author;

        renderWithDefaultData(<Author author={author} createdAt={post.created_at} isEdited={false} />);

        const link = screen.getByLabelText(`${author.first_name} profile`);

        expect(link).toHaveAttribute('href', `/profile/${author.id}`);
    });

    it('display "(edited)" when post was edited', () => {
        const post = PostEditedJson;

        renderWithDefaultData(<Author author={post.author} createdAt={post.created_at} isEdited={true} />);

        const element = screen.getByText(`${post.created_at} (Edited)`);

        expect(element).toBeInTheDocument();
    });

    it('display author name properly', () => {
        const post = PostsFirstPageJson.data[0];

        renderWithDefaultData(<Author author={post.author} createdAt={post.created_at} isEdited={false} />);

        const name = screen.getByText(post.author.name);

        expect(name).toBeInTheDocument();
    });
});
