import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { ChooseEmoji } from './ChooseEmoji';
import * as Formik from 'formik';
import { mockResizeObserver } from '@utils/mockResizeObserver';

describe('ChooseEmoji component', () => {
    const user = userEvent.setup();

    const useFormikContextMock = jest.spyOn(Formik, 'useFormikContext');

    beforeEach(() => {
        mockResizeObserver();

        useFormikContextMock.mockReturnValue({
            getFieldMeta: {
                value: 'testValue',
                initialTouched: true,
                touched: false,
            },
        } as any);
    });

    it('open tooltip when click on trigger button', async () => {
        renderWithDefaultData(<ChooseEmoji />);

        const trigger = screen.getByLabelText('Choose an emoji');

        await user.click(trigger);

        const emojisList = await screen.findAllByLabelText('Emojis list');

        await waitFor(() => {
            expect(emojisList[0]).toBeInTheDocument();
        });
    });
});
