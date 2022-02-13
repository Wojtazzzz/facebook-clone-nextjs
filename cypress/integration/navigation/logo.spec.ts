const BASE_URL = Cypress.config().baseUrl;

describe('Logo', () => {
    it('Is logo redirect to /', () => {
        cy.visit('/');

        cy.get('a[data-test-id="navigation-logo"]').click();
        cy.url().should('eq', BASE_URL + '/');

        cy.get('span').contains('This page isn\'t available').should('not.exist');
    })
});

export { };