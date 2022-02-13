const BASE_URL = Cypress.config().baseUrl;

describe('Check all pages exists', () => {
    it('/', () => {
        cy.visit('/');
        cy.url().should('eq', BASE_URL + '/');
        cy.get('span').contains('This page isn\'t available').should('not.exist');
    });

    it('/marketplace', () => {
        cy.visit('/marketplace');
        cy.url().should('eq', BASE_URL + '/marketplace');
        cy.get('span').contains('This page isn\'t available').should('not.exist');
    });

    it('/profile', () => {
        cy.visit('/profile');
        cy.url().should('eq', BASE_URL + '/profile');
        cy.get('span').contains('This page isn\'t available').should('not.exist');
    });

    it('/login', () => {
        cy.visit('/login');
        cy.url().should('eq', BASE_URL + '/login');
        cy.get('span').contains('This page isn\'t available').should('not.exist');
    });
});

export { };