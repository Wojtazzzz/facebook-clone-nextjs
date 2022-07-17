import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Info } from '@components/pages/profile/intro/Info';
import { screen } from '@testing-library/react';
import { faHome } from '@fortawesome/free-solid-svg-icons';

describe('Info tests', () => {
    it('render properly title and value', () => {
        renderWithDefaultData(<Info icon={faHome} title="Simple title" info="Simple value" />);

        const title = screen.getByText('Simple title');
        const value = screen.getByText('Simple value');

        expect(title).toBeInTheDocument();
        expect(value).toBeInTheDocument();
    });

    it('when no info passed render as "Marital status"', () => {
        renderWithDefaultData(<Info icon={faHome} title="Simple title title of marital status" />);

        const maritalStatusContainer = screen.getByLabelText('Marital status');
        const title = screen.getByText('Simple title title of marital status');

        expect(maritalStatusContainer).toBeInTheDocument();
        expect(title).toBeInTheDocument();
    });
});
