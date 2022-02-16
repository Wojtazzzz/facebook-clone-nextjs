const BASE_URL = Cypress.env('base_url');
const BACKEND_URL = Cypress.env('backend_url');


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

    it('Registration and auto login after', () => {
        cy.intercept('POST', `${BACKEND_URL}/register`).as('register');

        cy.get('button').contains('Create Random User').click().should('be.disabled');

        cy.wait('@register').then(interception => {
            expect(interception.response?.statusCode).to.eq(204);

            cy.intercept('GET', `${BACKEND_URL}/api/user`).as('user');
        });

        cy.url().should('eq', `${BASE_URL}/`);

        cy.wait('@user').then(interception => {
            expect(interception.response?.statusCode).to.eq(200);
        });
    });
});

export { };