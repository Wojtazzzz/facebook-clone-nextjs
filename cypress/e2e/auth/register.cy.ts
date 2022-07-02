import { useDatabaseMigrations } from 'cypress-laravel';

const APP_URL = Cypress.env('APP_URL');

describe('Register tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.intercept('/api/user').as('user');
    });

    it('after successful registration redirect to main page', () => {
        cy.intercept('/register').as('register');
        cy.intercept('/sanctum/csrf-cookie').as('csrf');

        cy.visit('');

        cy.wait('@user');

        cy.contains("Don't have an account?").click();
        cy.get('button').contains('Create Random User').click();

        cy.intercept('/api/user').as('secondUser');

        cy.wait('@csrf');
        cy.wait('@register');
        cy.wait('@secondUser');

        cy.url().should('eq', `${APP_URL}/`);
    });

    it('failed registration show error message', () => {
        cy.intercept('/register', { statusCode: 500 }).as('register');
        cy.intercept('/sanctum/csrf-cookie').as('csrf');

        cy.visit('');

        cy.wait('@user');

        cy.contains("Don't have an account?").click();
        cy.get('button').contains('Create Random User').click();

        cy.intercept('/api/user').as('secondUser');

        cy.wait('@csrf');
        cy.wait('@register');
        cy.wait('@secondUser');

        cy.url().should('eq', `${APP_URL}/login`);
        cy.contains('Request failed with status code 500');
    });
});
