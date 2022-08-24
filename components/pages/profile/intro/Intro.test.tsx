import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Intro } from '@components/pages/profile/intro/Intro';
import { screen } from '@testing-library/react';

describe('Intro tests', () => {
    it('renders properly section title', () => {
        renderWithDefaultData(<Intro created_at="January 2020" />);

        const title = screen.getByText('Intro');

        expect(title).toBeInTheDocument();
    });

    it('render properly section data', () => {
        renderWithDefaultData(
            <Intro
                works_at="Simple company"
                went_to="Simple uniwersity"
                lives_in="Simple city"
                from="Simple town"
                created_at="January 2020"
                marital_status="Widowed"
            />
        );

        const worksAt = screen.getByText('Simple company');
        const wentTo = screen.getByText('Simple uniwersity');
        const livesIn = screen.getByText('Simple city');
        const from = screen.getByText('Simple town');
        const createdAt = screen.getByText('January 2020');
        const maritalStatus = screen.getByText('Widowed');

        expect(worksAt).toBeInTheDocument();
        expect(wentTo).toBeInTheDocument();
        expect(livesIn).toBeInTheDocument();
        expect(from).toBeInTheDocument();
        expect(createdAt).toBeInTheDocument();
        expect(maritalStatus).toBeInTheDocument();
    });

    it('not render data which is not passed', () => {
        renderWithDefaultData(<Intro created_at="January 2020" />);

        const worksAt = screen.queryByLabelText('Works at');
        const wentTo = screen.queryByLabelText('Went to');
        const livesIn = screen.queryByLabelText('Lives in');
        const from = screen.queryByLabelText('From');
        const createdAt = screen.getByLabelText('Joined on');
        const maritalStatus = screen.queryByLabelText('Marital status');

        expect(worksAt).not.toBeInTheDocument();
        expect(wentTo).not.toBeInTheDocument();
        expect(wentTo).not.toBeInTheDocument();
        expect(livesIn).not.toBeInTheDocument();
        expect(from).not.toBeInTheDocument();
        expect(createdAt).toBeInTheDocument();
        expect(maritalStatus).not.toBeInTheDocument();
    });
});
