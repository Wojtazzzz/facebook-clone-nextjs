const BASE_URL = Cypress.config().baseUrl;


// change to component test
describe('Logo', () => {
    it('Is logo redirect to /', () => {
        cy.visit('/marketplace');

        cy.get('nav > div[class="w-1/3 flex items-center gap-2 my-1"] > a[href="/"]').contains('svg').click();
        cy.url().should('eq', BASE_URL + '/');

        cy.get('span').contains('This page isn\'t available').should('not.exist');
    })
});

export { };