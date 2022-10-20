import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { NavItem } from './NavItem';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { mockUseRouter } from '@utils/tests/mockUseRouter';

describe('NavItem component tests', () => {
    beforeEach(() => {
        mockUseRouter();
    });

    it('renders aria-label, title, href attributes properly', () => {
        const title = 'Custom NavItem';
        const name = 'Custom NavItem name';
        const path = '/custom/navitem/path';

        renderWithDefaultData(<NavItem label={name} title={title} path={path} icon={faGithub} />);

        const navItem = screen.getByLabelText(name);

        expect(navItem).toHaveAccessibleName(name);
        expect(navItem).toHaveAttribute('title', name);
        expect(navItem).toHaveAttribute('href', path);

        const text = screen.getByText(title);

        expect(text).toBeInTheDocument();
    });
});
