import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { NavItem } from './NavItem';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

describe('NavItem component', () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');

    it('renders aria-label, title, href attributes and text properly', () => {
        useRouter.mockImplementation(() => ({
            route: '/',
            pathname: '/',
            query: '',
            asPath: '/',
            prefetch: () => ({
                catch: jest.fn(),
            }),
        }));

        const name = 'Custom NavItem name';
        const path = '/custom/navitem/path';

        renderWithDefaultData(<NavItem name={name} path={path} icon={faGithub} />);

        const navItem = screen.getByLabelText(name);

        expect(navItem).toHaveAttribute('aria-label', name);
        expect(navItem).toHaveAttribute('title', name);
        expect(navItem).toHaveAttribute('href', path);
    });
});
