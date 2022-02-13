const baseUrl = Cypress.config().baseUrl;

describe('Check all pages exists', () => {
    it('/', () => {
        cy.visit('/');
        cy.url().should('eq', baseUrl + '/');
        cy.get('span').contains('This page isn\'t available').should('not.exist');
    });

    it('/marketplace', () => {
        cy.visit('/marketplace');
        cy.url().should('eq', baseUrl + '/marketplace');
        cy.get('span').contains('This page isn\'t available').should('not.exist');
    });

    it('/profile', () => {
        cy.visit('/profile');
        cy.url().should('eq', baseUrl + '/profile');
        cy.get('span').contains('This page isn\'t available').should('not.exist');
    });

    it('/login', () => {
        cy.visit('/login');
        cy.url().should('eq', baseUrl + '/login');
        cy.get('span').contains('This page isn\'t available').should('not.exist');
    });
});

export { };