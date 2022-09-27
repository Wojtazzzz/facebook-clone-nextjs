import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Info } from './Info';

describe('Info tests', () => {
    it('render properly title and value', () => {
        renderWithDefaultData(<Info label="Simple label" icon={faHome} title="Simple title" info="Simple value" />);

        const title = screen.getByText('Simple title');
        const value = screen.getByText('Simple value');

        expect(title).toBeInTheDocument();
        expect(value).toBeInTheDocument();
    });

    it('when no info passed title will be accessible label', () => {
        renderWithDefaultData(<Info label="Marital status" icon={faHome} title="Marital status" />);

        const label = screen.getByLabelText('Marital status');
        const text = screen.getByText('Marital status');

        expect(label).toBeInTheDocument();
        expect(text).toBeInTheDocument();
    });
});
