import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Author } from '@components/pages/posts/post/header/author/Author';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import PostEditedJson from '@mocks/posts/editedPost.json';
import { screen } from '@testing-library/react';

describe('Author component', () => {
    it('has link to user profile', () => {
        const post = PostsFirstPageJson[0];
        const author = post.author;

        renderWithDefaultData(<Author author={author} created_at={post.created_at} updated_at={post.updated_at} />);

        const link = screen.getByLabelText(`${author.first_name} profile`);

        expect(link).toHaveAttribute('href', `/profile/${author.id}`);
    });

    it('display "(edited)" when post update date is different', () => {
        const post = PostEditedJson;

        renderWithDefaultData(
            <Author author={post.author} created_at={post.created_at} updated_at={post.updated_at} />
        );

        const element = screen.getByText(`${post.updated_at} (Edited)`);

        expect(element).toBeInTheDocument();
    });

    it('display author name properly', () => {
        const post = PostsFirstPageJson[0];

        renderWithDefaultData(
            <Author author={post.author} created_at={post.created_at} updated_at={post.updated_at} />
        );

        const name = screen.getByText(post.author.name);

        expect(name).toBeInTheDocument();
    });
});
