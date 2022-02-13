const baseUrl = Cypress.config().baseUrl;

describe('Navigation links', () => {
    it('Check / redirect exists', () => {
        cy.visit('/marketplace');

        cy.get('a[data-test-id="navigation-redirect-home"]').click();
        cy.url().should('eq', baseUrl + '/');

        cy.get('span').contains('This page isn\'t available').should('not.exist');
    });

    it('Check /marketplace redirect exists', () => {
        cy.visit('/profile');

        cy.get('a[data-test-id="navigation-redirect-marketplace"]').click();
        cy.url().should('eq', baseUrl + '/marketplace');

        cy.get('span').contains('This page isn\'t available').should('not.exist');
    });

    it('Check /profile redirect exists', () => {
        cy.visit('/');

        cy.get('a[data-test-id="navigation-redirect-profile"]').click();
        cy.url().should('eq', baseUrl + '/profile');

        cy.get('span').contains('This page isn\'t available').should('not.exist');
    });
});

export { };