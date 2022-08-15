import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Messages } from '@components/chat/messages/Messages';
import JohnDoeJson from '@mocks/user/johnDoe.json';
import ChatFirstPageJson from '@mocks/chat/firstPage.json';
import ChatEmptyPageJson from '@mocks/chat/empty.json';
import { mock } from '@libs/nock';
import { screen } from '@testing-library/react';
import nock from 'nock';

describe('Messages component', () => {
    const messages = ChatFirstPageJson.data;

    afterEach(() => {
        nock.cleanAll();
        nock.enableNetConnect();
    });

    it('render loaders when initial loading messages', () => {
        mock(`/api/messages/${JohnDoeJson.id}?page=1`, 200, ChatFirstPageJson);

        renderWithDefaultData(<Messages friendId={JohnDoeJson.id} />);

        const loaders = screen.getByTestId('messages-loader_loading');
        expect(loaders).toBeInTheDocument();
    });

    it('load and render 15 messages', async () => {
        mock(`/api/messages/${JohnDoeJson.id}?page=1`, 200, ChatFirstPageJson);

        renderWithDefaultData(<Messages friendId={JohnDoeJson.id} />);

        const firstMessage = await screen.findByText(messages[0].text);
        expect(firstMessage).toBeInTheDocument();

        const tenthMessage = await screen.findByText(messages[14].text);
        expect(tenthMessage).toBeInTheDocument();
    });

    it('load empty list and show empty component', async () => {
        mock(`/api/messages/${JohnDoeJson.id}?page=1`, 200, ChatEmptyPageJson);

        renderWithDefaultData(<Messages friendId={JohnDoeJson.id} />);

        const emptyComponent = await screen.findByText('Say hello to your friend!');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('render error component on api error', async () => {
        mock(`/api/messages/${JohnDoeJson.id}?page=1`, 500);

        renderWithDefaultData(<Messages friendId={JohnDoeJson.id} />);

        const errorComponent = await screen.findByText('Something went wrong');
        expect(errorComponent).toBeInTheDocument();

        const errorImage = await screen.findByAltText('Server error');
        expect(errorImage).toBeInTheDocument();
    });
});
