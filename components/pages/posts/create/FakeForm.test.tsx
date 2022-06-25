import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { FakeForm } from '@components/pages/posts/create/FakeForm';
import { mock } from '@libs/nock';
import RootUserJson from '@mocks/user/root.json';
import { screen } from '@testing-library/react';

describe('FakeForm component', () => {
    beforeEach(() => {
        mock('/api/user', 200, RootUserJson);
    });

    it('render loaders when user not loaded', () => {
        renderWithDefaultData(<FakeForm />);

        const loaders = screen.getByTestId('fakeForm-loaders');

        expect(loaders).toBeInTheDocument();
    });

    it('render avatar and text with user name properly', async () => {
        renderWithDefaultData(<FakeForm />);

        const avatar = await screen.findByAltText(RootUserJson.name);
        const text = await screen.findByText(`What's on your mind, ${RootUserJson.first_name}?`);

        expect(text).toBeInTheDocument();
        expect(avatar).toBeInTheDocument();
    });
});
