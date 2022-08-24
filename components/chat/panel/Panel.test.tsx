import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Panel } from '@components/chat/panel/Panel';
import { screen } from '@testing-library/react';

describe('Panel component', () => {
    it('renders send message and send image buttons', () => {
        renderWithDefaultData(<Panel />);

        const sendImageComponent = screen.getByLabelText('Send image');
        const sendMessageComponent = screen.getByTestId('sendMessage-form');

        expect(sendImageComponent).toBeInTheDocument();
        expect(sendMessageComponent).toBeInTheDocument();
    });
});
