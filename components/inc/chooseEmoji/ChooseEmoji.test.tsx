import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { ChooseEmoji } from './ChooseEmoji';
import { mockResizeObserver } from '@utils/tests/mockResizeObserver';
import { mockFormikContext } from '@utils/tests/mockFormikContext';

describe('ChooseEmoji component', () => {
    const mockAddToContent = jest.fn();

    const user = userEvent.setup();

    beforeEach(() => {
        mockResizeObserver();
        mockFormikContext();
    });

    it('open tooltip when click on trigger button', async () => {
        renderWithDefaultData(<ChooseEmoji addToContent={mockAddToContent} />);

        const trigger = screen.getByLabelText('Choose an emoji');

        await user.click(trigger);

        const emojisList = await screen.findAllByLabelText('Emojis list');

        await waitFor(() => {
            expect(emojisList[0]).toBeInTheDocument();
        });
    });
});
