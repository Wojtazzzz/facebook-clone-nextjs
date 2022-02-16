const BASE_URL = Cypress.env('base_url');


describe('404 Page', () => {
    beforeEach(() => {
        cy.visit('/404', { failOnStatusCode: false });
    });

    it('Is exists', () => {
        cy.get('span').contains('This page isn\'t available').should('be.visible');
    });

    it('Redirect back by button', () => {
        cy.get('button').contains('Go to Home Page').click();

        cy.url().should('eq', `${BASE_URL}/`);
    });
});

export { };