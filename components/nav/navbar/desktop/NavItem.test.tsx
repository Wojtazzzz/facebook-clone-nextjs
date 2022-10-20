import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { NavItem } from './NavItem';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { mockUseRouter } from '@utils/tests/mockUseRouter';

describe('NavItem component tests', () => {
    beforeEach(() => {
        mockUseRouter();
    });

    it('renders aria-label, title, href attributes and text properly', () => {
        const name = 'Custom NavItem name';
        const path = '/custom/navitem/path';

        renderWithDefaultData(<NavItem name={name} path={path} icon={faGithub} />);

        const navItem = screen.getByLabelText(name);

        expect(navItem).toHaveAttribute('aria-label', name);
        expect(navItem).toHaveAttribute('title', name);
        expect(navItem).toHaveAttribute('href', path);
    });
});
