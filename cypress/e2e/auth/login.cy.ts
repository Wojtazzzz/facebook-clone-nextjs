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

        cy.intercept('/api/user').as('user');
    });

    it('main page redirects to "/login" when user not logged', () => {
        cy.visit('/');

        cy.wait('@user').its('response.statusCode').should('eq', 401);

        cy.url().should('include', '/login');
    });

    it('successful login to app redirects to main page', () => {
        cy.intercept('/login').as('login');
        cy.intercept('/sanctum/csrf-cookie').as('csrf');

        cy.visit('');

        cy.wait('@user');

        cy.get('input[aria-label="Address e-mail"]').type(USER_EMAIL);
        cy.get('input[aria-label="Password"]').type(USER_PASSWORD);
        cy.get('button[aria-label="Login"]').click();

        cy.intercept('/api/user').as('secondUser');

        cy.wait('@csrf');
        cy.wait('@login');
        cy.wait('@secondUser');

        cy.url().should('eq', `${APP_URL}/`);
    });

    it('failed login to app shows error message', () => {
        cy.intercept('/login').as('login');

        cy.visit('');

        cy.wait('@user');

        cy.get('input[aria-label="Address e-mail"]').type(`WRONG_EMAIL@GMAIL.COM`);
        cy.get('input[aria-label="Password"]').type('WRONG_PASSWORD');
        cy.get('button[aria-label="Login"]').click();

        cy.wait('@login');

        cy.contains('These credentials do not match our records.');
    });
});
