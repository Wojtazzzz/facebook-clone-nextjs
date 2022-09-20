import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { SendMessage } from '@components/chat/sendMessage/SendMessage';
import { screen } from '@testing-library/react';

describe('SendMessage component', () => {
    it('render send message and send image buttons', () => {
        renderWithDefaultData(<SendMessage />);

        const sendImageComponent = screen.getByLabelText('Add images');
        const sendMessageComponent = screen.getByTestId('sendMessage-form');

        expect(sendImageComponent).toBeInTheDocument();
        expect(sendMessageComponent).toBeInTheDocument();
    });
});
