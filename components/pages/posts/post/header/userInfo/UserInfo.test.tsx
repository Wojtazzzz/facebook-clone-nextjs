import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { UserInfo } from '@components/pages/posts/post/header/userInfo/UserInfo';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import PostEditedJson from '@mocks/posts/editedPost.json';
import { screen } from '@testing-library/react';

describe('UserInfo component', () => {
    it('has link to user profile', () => {
        const post = PostsFirstPageJson[0];
        const author = post.author;

        renderWithDefaultData(<UserInfo author={author} created_at={post.created_at} updated_at={post.updated_at} />);

        const link = screen.getByLabelText(`${author.first_name} profile`);

        expect(link).toHaveAttribute('href', `/profile/${author.id}`);
    });

    it('display "(edited)" when post update date is different', () => {
        const post = PostEditedJson;

        renderWithDefaultData(
            <UserInfo author={post.author} created_at={post.created_at} updated_at={post.updated_at} />
        );

        const element = screen.getByText(`${post.updated_at} (Edited)`);

        expect(element).toBeInTheDocument();
    });

    it('display author name properly', () => {
        const post = PostsFirstPageJson[0];

        renderWithDefaultData(
            <UserInfo author={post.author} created_at={post.created_at} updated_at={post.updated_at} />
        );

        const name = screen.getByText(post.author.name);

        expect(name).toBeInTheDocument();
    });
});
