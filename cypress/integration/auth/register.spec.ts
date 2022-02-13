const BASE_URL = Cypress.config().baseUrl;
const BACKEND_URL = 'http://localhost:8000';

describe('Register process', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('span').contains('Don\'t have an account').should('be.visible').click();
    });

    it('Is redirecting text changing', () => {
        cy.get('span').contains('Don\'t have an account').should('not.exist');
        cy.get('span').contains('Have an account?').should('be.visible').click();
        cy.get('span').contains('Have an account?').should('not.exist');
        cy.get('span').contains('Don\'t have an account').should('be.visible')
    });

    it('Can create random user', () => {
        cy.intercept('POST', `${BACKEND_URL}/register`).as('registerRequest');

        cy.get('button').contains('Create Random User').click().should('be.disabled');

        cy.wait('@registerRequest', { timeout: 10000 }).its('response.statusCode').should('eq', 204);

        cy.wait(1000);

        cy.url().should('eq', BASE_URL + '/');
    });
});

export { };