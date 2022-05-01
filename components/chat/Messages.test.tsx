import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Messages } from '@components/chat/Messages';
import JohnDoeJson from '@mocks/user/johnDoe.json';
import ChatFirstPageJson from '@mocks/chat/firstPage.json';
import ChatEmptyPageJson from '@mocks/chat/empty.json';
import { mock } from '@libs/nock';
import { screen } from '@testing-library/react';

describe('Messages component', () => {
    it('show loaders when initial loading messages', () => {
        mock(`/api/messages/${JohnDoeJson.id}?page=1`, 200, ChatFirstPageJson);

        renderWithDefaultData(<Messages friendId={JohnDoeJson.id} />);

        const loaders = screen.getByTestId('messages-loader_loading');
        expect(loaders).toBeInTheDocument();
    });

    it('load first chat list', async () => {
        mock(`/api/messages/${JohnDoeJson.id}?page=1`, 200, ChatFirstPageJson);

        renderWithDefaultData(<Messages friendId={JohnDoeJson.id} />);

        const firstMessage = await screen.findByText(ChatFirstPageJson[0].text);
        expect(firstMessage).toBeInTheDocument();

        const tenthMessage = await screen.findByText(ChatFirstPageJson[9].text);
        expect(tenthMessage).toBeInTheDocument();
    });

    it('load empty list and show empty component', async () => {
        mock(`/api/messages/${JohnDoeJson.id}?page=1`, 200, ChatEmptyPageJson);

        renderWithDefaultData(<Messages friendId={JohnDoeJson.id} />);

        const emptyComponent = await screen.findByText('Say hello to your friend!');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('show error component on api error', async () => {
        mock(`/api/messages/${JohnDoeJson.id}?page=1`, 500);

        renderWithDefaultData(<Messages friendId={JohnDoeJson.id} />);

        const errorComponent = await screen.findByText('Something went wrong');
        expect(errorComponent).toBeInTheDocument();

        const errorImage = await screen.findByAltText('Server error');
        expect(errorImage).toBeInTheDocument();
    });
});
