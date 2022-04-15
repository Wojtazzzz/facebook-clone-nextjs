import { Sidebar } from '@components/sidebar/Sidebar';
import axios from 'axios';
import { store } from '@redux/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import RootUserJson from '@mocks/user/root.json';
import nock from 'nock';
import { nockReplyHeaders } from '@libs/nockReplyHeaders';

axios.defaults.adapter = require('axios/lib/adapters/http');

describe('Sidebar component', () => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

    afterEach(() => {
        nock.restore();
    });

    it('loads logged user', async () => {
        nock.disableNetConnect();

        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).options('/api/user').reply(200);
        nock(BACKEND_URL).defaultReplyHeaders(nockReplyHeaders).get('/api/user').reply(200, RootUserJson);

        render(
            <Provider store={store}>
                <Sidebar />
            </Provider>,
        );

        const loggedUser = await screen.findByText(RootUserJson.name);
        expect(loggedUser).toBeInTheDocument();
    });

    it('renders friends, pokes, github link properly', () => {
        render(
            <Provider store={store}>
                <Sidebar />
            </Provider>,
        );

        const friendsElement = screen.getByTitle('Friends');
        const pokesElement = screen.getByTitle('Pokes');
        const githubElement = screen.getByTitle('GitHub');

        expect(friendsElement).toBeInTheDocument();
        expect(pokesElement).toBeInTheDocument();
        expect(githubElement).toBeInTheDocument();

        expect(friendsElement).toHaveAttribute('href', '/friends');
        expect(pokesElement).toHaveAttribute('href', '/friends/pokes');
        expect(githubElement).toHaveAttribute('href', 'https://github.com/CubeStorm/');
    });
});
