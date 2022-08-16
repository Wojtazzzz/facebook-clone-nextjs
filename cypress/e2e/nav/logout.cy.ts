import { useDatabaseMigrations } from 'cypress-laravel';

const APP_URL = Cypress.env('APP_URL');

describe('Logout tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();
    });

    it('logout from app, request redirect to login page', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');

        cy.wait('@user');

        cy.intercept('/api/logout').as('logout');

        cy.get('button[aria-label="Log out"]').click();

        cy.wait('@logout');

        cy.url().should('eq', `${APP_URL}/login`);
    });
});
