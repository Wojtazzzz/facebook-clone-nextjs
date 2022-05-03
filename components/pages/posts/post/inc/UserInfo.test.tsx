import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { UserInfo } from '@components/pages/posts/post/inc/UserInfo';
import PostsFirstPageJson from '@mocks/posts/firstPage.json';
import PostEditedJson from '@mocks/posts/editedPost.json';
import { screen } from '@testing-library/react';

describe('UserInfo component', () => {
    it('has link to user profile', () => {
        const firstPost = PostsFirstPageJson[0];

        renderWithDefaultData(
            <UserInfo author={firstPost.author} created_at={firstPost.created_at} updated_at={firstPost.updated_at} />
        );

        const link = screen.getByLabelText(`${firstPost.author.first_name} profile`);

        expect(link).toHaveAttribute('href', `/profile/${firstPost.author.id}`);
    });

    it('display "(edited)" when post update date is different', () => {
        renderWithDefaultData(
            <UserInfo
                author={PostEditedJson.author}
                created_at={PostEditedJson.created_at}
                updated_at={PostEditedJson.updated_at}
            />
        );

        const element = screen.getByText(`${PostEditedJson.updated_at} (Edited)`);

        expect(element).toBeInTheDocument();
    });
});
