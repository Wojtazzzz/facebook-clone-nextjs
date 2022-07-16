import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Panel } from '@components/pages/profile/hero/panel/Panel';
import RootUserJson from '@mocks/user/root.json';
import { mock } from '@libs/nock';
import { screen } from '@testing-library/react';

describe('Profile AuthPanel tests', () => {
    it('render edit profile button which is disabled', async () => {
        mock('/api/user', 200, RootUserJson);

        renderWithDefaultData(<Panel pageUser={RootUserJson} />);

        const editButton = await screen.findByLabelText('Edit profile');

        expect(editButton).toBeInTheDocument();
        expect(editButton).toBeDisabled();
    });
});
