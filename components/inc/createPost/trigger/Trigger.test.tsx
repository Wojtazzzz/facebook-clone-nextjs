import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Trigger } from './Trigger';
import { mock } from '@utils/nock';
import RootUserJson from '@mocks/user/root.json';
import { screen } from '@testing-library/react';

describe('Trigger component', () => {
    beforeEach(() => {
        mock({
            path: '/api/user',
            data: RootUserJson,
        });
    });

    it('render loaders when user not loaded', () => {
        renderWithDefaultData(<Trigger />);

        const loaders = screen.getByTestId('createPostTrigger-loader');

        expect(loaders).toBeInTheDocument();
    });

    it('render avatar and text with user name properly', async () => {
        renderWithDefaultData(<Trigger />);

        const avatar = await screen.findByAltText(RootUserJson.name);
        const text = await screen.findByText(`What's on your mind, ${RootUserJson.first_name}?`);

        expect(text).toBeInTheDocument();
        expect(avatar).toBeInTheDocument();
    });
});
