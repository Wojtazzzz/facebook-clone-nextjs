const BACKEND_URL = Cypress.env('backend_url');

const TEST_EMAIL = Cypress.env('test_email');
const TEST_PASSWORD = Cypress.env('test_password');


describe('Logout process', () => {
    it('Logged user try to logout', () => {
        cy.intercept('GET', `${BACKEND_URL}/sanctum/csrf-cookie`).as('csrfRequest');
        cy.intercept('POST', `${BACKEND_URL}/login`).as('loginRequest');
        cy.intercept('POST', `${BACKEND_URL}/logout`).as('logoutRequest');

        cy.visit('/login');

        cy.get('input[name="email"]').type(TEST_EMAIL);
        cy.get('input[name="password"]').type(`${TEST_PASSWORD}{enter}`);

        cy.wait('@csrfRequest').then(() => {
            cy.wait('@loginRequest').then(() => {
                cy.intercept('GET', `${BACKEND_URL}/api/user`).as('userRequest');
            });
        });

        cy.wait('@userRequest').then(() => {
            cy.get('nav').within(() => {
                cy.get('button[aria-label="Log out"]').click();
            });
        });

        cy.wait('@logoutRequest').then(interception => {
            expect(interception.response?.statusCode).to.eq(204);
        });
    });
});

export { };