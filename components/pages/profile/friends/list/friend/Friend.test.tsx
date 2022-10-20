import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Friend } from './Friend';
import JohnDoeJson from '@mocks/user/johnDoe.json';

describe('Friend component tests', () => {
    const { id, name, profile_image } = JohnDoeJson;

    it('render correct friend name', () => {
        renderWithDefaultData(<Friend id={id} name={name} profile_image={profile_image} />);

        const text = screen.getByText(name);

        expect(text).toBeInTheDocument();
    });

    it('render friend avatar', () => {
        renderWithDefaultData(<Friend id={id} name={name} profile_image={profile_image} />);

        const avatar = screen.getByRole('img');

        expect(avatar).toBeVisible();
    });

    it('have links to friend profile', () => {
        renderWithDefaultData(<Friend id={id} name={name} profile_image={profile_image} />);

        const links = screen.getAllByRole('link');

        expect(links).toHaveLength(2);

        links.forEach((link) => {
            expect(link).toHaveAttribute('href', `/profile/${id}`);
        });
    });
});
