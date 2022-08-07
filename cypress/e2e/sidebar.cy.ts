import { useDatabaseMigrations } from 'cypress-laravel';

const USER_FIRST_NAME = Cypress.env('USER_FIRST_NAME');
const USER_LAST_NAME = Cypress.env('USER_LAST_NAME');

describe('Sidebar links tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();

        cy.intercept('/api/user').as('user');
    });

    it('link displays logged user name and redirects to profile page by click', () => {
        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="sidebar"]').within(() => {
            cy.contains(`${USER_FIRST_NAME} ${USER_LAST_NAME}`).click();

            cy.url().should('include', '/profile/1');
        });
    });

    it('friends link redirects to friends page, pokes link redirects to pokes page', () => {
        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="sidebar"]').within(() => {
            cy.contains('Friends').click();
            cy.url().should('include', '/friends');
        });

        cy.get('[data-testid="sidebar"]').within(() => {
            cy.contains('Pokes').click();
            cy.url().should('include', '/friends/pokes');
        });

        cy.get('[data-testid="sidebar"]').within(() => {
            cy.contains('GitHub').should('have.attr', 'target', '_blank');
            cy.contains('GitHub').should('have.attr', 'href', 'https://github.com/CubeStorm/');
        });
    });
});
