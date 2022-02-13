const BASE_URL = Cypress.config().baseUrl;
const BACKEND_URL = 'http://localhost:8000';

const EMAIL = 'admin@gmail.com';
const PASSWORD = 'admin';

describe('Are middleware\'a redirects works', () => {
    it('Redirect from AuthLayout to GuestLayout as not logged user', () => {
        cy.visit('/');
        cy.wait(1000);
        cy.url().should('eq', BASE_URL + '/login');
    });

    it('Redirect from GuestLayout to AuthLayout as logged user', () => {
        cy.intercept('GET', `${BACKEND_URL}/sanctum/csrf-cookie`).as('csrfRequest');
        cy.intercept('POST', `${BACKEND_URL}/login`).as('loginRequest');

        cy.visit('/login');

        cy.get('input[name=email]').type(EMAIL);
        cy.get('input[name=password]').type(PASSWORD);

        cy.get('button[type="submit"]').click();

        cy.wait('@csrfRequest');
        cy.wait('@loginRequest');

        cy.url().should('eq', BASE_URL + '/');

        cy.visit('/login');

        cy.wait(1000);

        cy.url().should('eq', BASE_URL + '/');
    });
});

export { };