import { screen } from '@testing-library/react';
import RootUserJson from '@mocks/user/root.json';
import MessengerFirstPageJson from '@mocks/messenger/firstPage.json';
import MessengerEmptyPageJson from '@mocks/messenger/empty.json';
import { List } from '@components/nav/panel/messenger/list/List';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { mock } from '@libs/nock';

describe('List component', () => {
    const messages = MessengerFirstPageJson.data;

    beforeEach(() => {
        mock('/api/user', 200, RootUserJson);
    });

    it('render loaders on initial fetching users to text', () => {
        mock('/api/messages?page=1', 200, MessengerFirstPageJson);

        renderWithDefaultData(<List />);

        const loader = screen.getByTestId('messenger-fetching_loader');

        expect(loader).toBeInTheDocument();
    });

    it('render properly first list of users to text', async () => {
        mock('/api/messages?page=1', 200, MessengerFirstPageJson);

        renderWithDefaultData(<List />);

        const firstElement = await screen.findByText(messages[0].name);
        expect(firstElement).toBeInTheDocument();

        const tenthElement = await screen.findByText(messages[9].name);
        expect(tenthElement).toBeInTheDocument();
    });

    it('render properly empty component when response return empty array', async () => {
        mock('/api/messages?page=1', 200, MessengerEmptyPageJson);

        renderWithDefaultData(<List />);

        const emptyComponent = await screen.findByText('Your Messenger is empty');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('render properly error component when api return error', async () => {
        mock('/api/messages?page=1', 500, []);

        renderWithDefaultData(<List />);

        const errorComponent = await screen.findByText('Something went wrong');
        expect(errorComponent).toBeInTheDocument();
    });
});
