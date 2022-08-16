import { useDatabaseMigrations } from 'cypress-laravel';

const APP_URL = Cypress.env('APP_URL');

describe('Auth middlewares tests', () => {
    useDatabaseMigrations();

    it('unauthorized user cannot be in app main page', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');

        cy.wait('@user');

        cy.url().should('include', '/login');
    });

    it('unauthorized user can be in login page', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/login');

        cy.wait('@user');

        cy.url().should('include', '/login');
    });

    it('authorized user cannot be in app login page', () => {
        cy.loginRequest();

        cy.intercept('/api/user').as('user');

        cy.visit('/login');

        cy.wait('@user');

        cy.url().should('eq', `${APP_URL}/`);
    });

    it('authorized user can be in app main page', () => {
        cy.loginRequest();

        cy.intercept('/api/user').as('user');

        cy.visit('/');

        cy.wait('@user');

        cy.url().should('eq', `${APP_URL}/`);
    });
});
