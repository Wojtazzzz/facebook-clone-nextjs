import { useDatabaseMigrations } from 'cypress-laravel';

const APP_URL = Cypress.env('APP_URL');
const USER_EMAIL = Cypress.env('USER_EMAIL');
const USER_PASSWORD = Cypress.env('USER_PASSWORD');

describe('Login tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.create('User', {
            email: USER_EMAIL,
        });
    });

    it('successful login to app redirects to main page', () => {
        cy.intercept('/api/user').as('user');

        cy.intercept('/api/login').as('login');

        cy.visit('/');

        cy.wait('@user');

        cy.get('input[aria-label="Email"]').type(USER_EMAIL);
        cy.get('input[aria-label="Password"]').type(USER_PASSWORD);
        cy.get('button[aria-label="Login"]').click();

        cy.intercept('/api/user').as('user');

        cy.wait('@login');
        cy.wait('@user');

        cy.url().should('eq', `${APP_URL}/`);
    });

    it('login with wrong credentials', () => {
        cy.intercept('/api/user').as('user');

        cy.intercept('/api/login').as('login');

        cy.visit('/');

        cy.get('input[aria-label="Email"]').type(`WRONG_EMAIL@GMAIL.COM`);
        cy.get('input[aria-label="Password"]').type('WRONG_PASSWORD');
        cy.get('button[aria-label="Login"]').click();

        cy.wait('@login');

        cy.contains('These credentials do not match our records.');
    });

    it('login response return server error', () => {
        cy.intercept('post', '/api/login', { statusCode: 500 }).as('login');

        cy.visit('/');

        cy.get('input[aria-label="Email"]').type(`email@gmail.com`);
        cy.get('input[aria-label="Password"]').type('password');
        cy.get('button[aria-label="Login"]').click();

        cy.wait('@login');

        cy.url().should('eq', `${APP_URL}/login`);
        cy.contains('Something went wrong, please try again later');
    });
});
