import { screen, within } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Container } from './Container';

describe('Container tests', () => {
    it('render correct header and content', () => {
        renderWithDefaultData(
            <Container testId="section-test" title="Header to test">
                <span>Test content</span>
            </Container>
        );

        const container = screen.getByTestId('section-test');

        const header = within(container).getByText('Header to test');
        const content = within(container).getByText('Test content');

        expect(header).toBeInTheDocument();
        expect(content).toBeInTheDocument();
    });
});
