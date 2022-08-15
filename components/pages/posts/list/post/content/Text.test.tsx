import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { Text } from './Text';

describe('Text component', () => {
    const content = 'Test content';

    it('render text when content is passed', () => {
        renderWithDefaultData(<Text content={content} />);

        const text = screen.getByText(content);

        expect(text).toBeInTheDocument();
    });

    it('dont render text when content is not passed', () => {
        renderWithDefaultData(<Text />);

        const contentSection = screen.queryByLabelText('Content');

        expect(contentSection).not.toBeInTheDocument();
    });
});
