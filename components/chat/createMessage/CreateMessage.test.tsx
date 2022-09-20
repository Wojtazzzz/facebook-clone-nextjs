import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { CreateMessage } from '@components/chat/createMessage/CreateMessage';
import { screen } from '@testing-library/react';

describe('CreateMessage component', () => {
    it('render send message and send image buttons', () => {
        renderWithDefaultData(<CreateMessage />);

        const sendImageComponent = screen.getByLabelText('Add images');
        const sendMessageComponent = screen.getByTestId('sendMessage-form');

        expect(sendImageComponent).toBeInTheDocument();
        expect(sendMessageComponent).toBeInTheDocument();
    });
});
