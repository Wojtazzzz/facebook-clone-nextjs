const baseUrl = Cypress.config().baseUrl;

describe('404 Page', () => {
    it('Is exists', () => {
        cy.visit('/404', { failOnStatusCode: false });
        cy.get('span').contains('This page isn\'t available').should('be.visible');
    });

    it('Is button redirect back', () => {
        cy.visit('/404', { failOnStatusCode: false });

        cy.get('button').contains('Go to News Feed').click();

        cy.url().should('eq', baseUrl + '/');
    });
});

export { };