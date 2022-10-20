import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Header } from '@components/chat/header/Header';
import JohnDoeJson from '@mocks/user/johnDoe.json';
import { screen } from '@testing-library/react';

describe('Header component tests', () => {
    it('render user avatar and name', () => {
        renderWithDefaultData(<Header name={JohnDoeJson.name} profileImage={JohnDoeJson.background_image} />);

        const avatar = screen.getByRole('img');
        const name = screen.getByText(JohnDoeJson.name);

        expect(avatar).toBeVisible();
        expect(name).toBeVisible();
    });

    it('have close chat button', () => {
        renderWithDefaultData(<Header name={JohnDoeJson.name} profileImage={JohnDoeJson.background_image} />);

        const closeChatButton = screen.getByLabelText('Close chat');

        expect(closeChatButton).toBeInTheDocument();
    });
});
