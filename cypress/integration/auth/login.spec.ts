const BASE_URL = Cypress.config().baseUrl;
const BACKEND_URL = 'http://localhost:8000';

const EMAIL = 'admin@gmail.com';
const PASSWORD = 'admin';


describe('Login process', () => {
    it('Is login page exists', () => {
        cy.visit('/login');

        cy.get('span').contains('This page isn\'t available').should('not.exist');
    });

    it('Can login to admin account', () => {
        cy.intercept('GET', `${BACKEND_URL}/sanctum/csrf-cookie`).as('csrfRequest');
        cy.intercept('POST', `${BACKEND_URL}/login`).as('loginRequest');

        cy.visit('/login');

        cy.get('input[name=email]').type(EMAIL);
        cy.get('input[name=password]').type(PASSWORD);

        cy.get('button[type="submit"]').click().should('be.disabled');

        cy.wait('@csrfRequest').its('response.statusCode').should('eq', 204).then(() => {
            cy.wait('@loginRequest').its('response.statusCode').should('eq', 204);
        });

        cy.intercept('GET', `${BACKEND_URL}/api/user`).as('userRequest');

        cy.url().should('eq', BASE_URL + '/')

        cy.wait('@userRequest', { timeout: 8000 }).its('response.statusCode').should('eq', 200);
    });

    it('Login to not existing account', () => {
        cy.intercept('GET', `${BACKEND_URL}/sanctum/csrf-cookie`).as('csrfRequest');
        cy.intercept('POST', `${BACKEND_URL}/login`).as('loginRequest');

        cy.visit('/login');

        cy.get('input[name=email]').type(EMAIL);
        cy.get('input[name=password]').type(PASSWORD + "s");

        cy.get('button[type="submit"]').click();

        cy.wait('@csrfRequest').its('response.statusCode').should('eq', 204).then(() => {
            cy.wait('@loginRequest').its('response.statusCode').should('eq', 422).then(() => {
                cy.intercept('GET', `${BACKEND_URL}/api/user`).as('userRequest');
            });
        });

        cy.url().should('eq', BASE_URL + '/login');

        cy.wait('@userRequest', { timeout: 15000 }).its('response.statusCode').should('eq', 401);
    });
});

export { };