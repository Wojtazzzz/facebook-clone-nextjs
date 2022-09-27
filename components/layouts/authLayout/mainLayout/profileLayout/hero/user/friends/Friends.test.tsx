import { mock } from '@libs/nock';
import RootUserJson from '@mocks/user/root.json';
import EightFriends from '@mocks/profile/friends/getByCount/eightFriends.json';
import OneFriend from '@mocks/profile/friends/getByCount/oneFriend.json';
import ZeroFriends from '@mocks/profile/friends/getByCount/empty.json';
import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Friends } from './Friends';

describe('Friends component', () => {
    it('render loader when fetching friends', () => {
        mock({
            path: `/api/users/${RootUserJson.id}/friends/getByCount?count=8`,
            data: EightFriends,
        });

        renderWithDefaultData(<Friends userId={RootUserJson.id} />);

        const loader = screen.getByTestId('hero-friends-loader');

        const img = screen.queryByRole('img');

        expect(loader).toBeInTheDocument();
        expect(img).not.toBeInTheDocument();
    });

    it('render error when response return server error', async () => {
        mock({
            path: `/api/users/${RootUserJson.id}/friends/getByCount?count=8`,
            data: EightFriends,
            status: 500,
        });

        renderWithDefaultData(<Friends userId={RootUserJson.id} />);

        const loader = await screen.findByText('Something went wrong, please try again later');

        const img = screen.queryByRole('img');

        expect(loader).toBeInTheDocument();
        expect(img).not.toBeInTheDocument();
    });

    it('render 1 avatar and correct text when 1 friend fetched', async () => {
        mock({
            path: `/api/users/${RootUserJson.id}/friends/getByCount?count=8`,
            data: OneFriend,
        });

        renderWithDefaultData(<Friends userId={RootUserJson.id} />);

        const text = await screen.findByText('1 friend');
        const imgs = await screen.findAllByRole('img');

        expect(imgs).toHaveLength(1);
        expect(text).toBeInTheDocument();
    });

    it('render 0 avatar and correct text when 0 friends fetched', async () => {
        mock({
            path: `/api/users/${RootUserJson.id}/friends/getByCount?count=8`,
            data: ZeroFriends,
        });

        renderWithDefaultData(<Friends userId={RootUserJson.id} />);

        const text = await screen.findByText('0 friends');
        const imgs = screen.queryByRole('img');

        expect(imgs).not.toBeInTheDocument();
        expect(text).toBeInTheDocument();
    });

    it('render 8 avatars and correct text when 8 friends fetched', async () => {
        mock({
            path: `/api/users/${RootUserJson.id}/friends/getByCount?count=8`,
            data: EightFriends,
        });

        renderWithDefaultData(<Friends userId={RootUserJson.id} />);

        const text = await screen.findByText('8 friends');
        const imgs = await screen.findAllByRole('img');

        expect(imgs).toHaveLength(8);
        expect(text).toBeInTheDocument();
    });
});
