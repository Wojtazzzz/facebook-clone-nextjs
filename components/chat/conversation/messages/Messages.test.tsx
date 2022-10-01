import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Messages } from '@components/chat/conversation/messages/Messages';
import JohnDoeJson from '@mocks/user/johnDoe.json';
import ChatFirstPageJson from '@mocks/chat/firstPage.json';
import ChatEmptyPageJson from '@mocks/chat/empty.json';
import { mock } from '@utils/nock';
import { screen } from '@testing-library/react';

describe('Messages component', () => {
    const messages = ChatFirstPageJson.data;
    const friend = JohnDoeJson;

    it('render loaders when initial loading messages', () => {
        mock({
            path: `/api/messages/${JohnDoeJson.id}?page=1`,
            data: ChatFirstPageJson,
        });

        renderWithDefaultData(<Messages friend={friend} />);

        const loaders = screen.getByTestId('messages-loader_loading');
        expect(loaders).toBeInTheDocument();
    });

    it('load and render 15 messages', async () => {
        mock({
            path: `/api/messages/${JohnDoeJson.id}?page=1`,
            data: ChatFirstPageJson,
        });

        renderWithDefaultData(<Messages friend={friend} />);

        const firstMessage = await screen.findByText(messages[0].content);
        expect(firstMessage).toBeInTheDocument();

        const fourteenthMessage = await screen.findByText(messages[14].content);
        expect(fourteenthMessage).toBeInTheDocument();
    });

    it('load empty list and show empty component', async () => {
        mock({
            path: `/api/messages/${JohnDoeJson.id}?page=1`,
            data: ChatEmptyPageJson,
        });

        renderWithDefaultData(<Messages friend={friend} />);

        const emptyComponent = await screen.findByText('Say hello to your friend!');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('render error component on api error', async () => {
        mock({
            path: `/api/messages/${JohnDoeJson.id}?page=1`,
            status: 500,
        });

        renderWithDefaultData(<Messages friend={friend} />);

        const errorComponent = await screen.findByText('Something went wrong');
        expect(errorComponent).toBeInTheDocument();

        const errorImage = await screen.findByAltText('Server error');
        expect(errorImage).toBeInTheDocument();
    });
});
