import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { NavItem } from '@components/nav/navbar/NavItem';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

describe('NavItem component', () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');

    it('renders aria-label, title, href attributes properly', () => {
        useRouter.mockImplementation(() => ({
            route: '/',
            pathname: '/',
            query: '',
            asPath: '/',
            prefetch: () => ({
                catch: jest.fn(),
            }),
        }));

        renderWithDefaultData(<NavItem name="Custom NavItem name" path="/custom/navitem/path" icon={faGithub} />);

        const navItem = screen.getByLabelText('Custom NavItem name page');

        expect(navItem).toHaveAttribute('aria-label', 'Custom NavItem name page');
        expect(navItem).toHaveAttribute('title', 'Custom NavItem name');
        expect(navItem).toHaveAttribute('href', '/custom/navitem/path');
    });
});
