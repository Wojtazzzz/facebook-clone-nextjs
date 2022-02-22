const BASE_URL = Cypress.env('base_url');
const BACKEND_URL = Cypress.env('backend_url');

const TEST_EMAIL = Cypress.env('test_email');
const TEST_PASSWORD = Cypress.env('test_password');


describe('Are middleware\'s redirects correctly', () => {
    it('Redirect from UserLayout to GuestLayout as not logged user', () => {
        cy.visit('/');
        cy.intercept('GET', `${BACKEND_URL}/api/user`).as('userRequest');

        cy.wait('@userRequest').then(() => {
            cy.url().should('eq', `${BASE_URL}/login`);
        });
    });

    it('Redirect from GuestLayout to UserLayout as logged user', () => {
        cy.intercept('GET', `${BACKEND_URL}/sanctum/csrf-cookie`).as('csrfRequest');
        cy.intercept('POST', `${BACKEND_URL}/login`).as('loginRequest');

        cy.visit('/login');

        cy.get('input[name="email"]').type(TEST_EMAIL);
        cy.get('input[name="password"]').type(TEST_PASSWORD);

        cy.get('button[type="submit"]').click();

        cy.wait('@csrfRequest').then(interception => {
            expect(interception.response?.statusCode).to.eq(204);
        });

        cy.wait('@loginRequest').then(interception => {
            expect(interception.response?.statusCode).to.eq(204);

            cy.intercept('GET', `${BACKEND_URL}/api/user`).as('userRequest');
        });

        cy.visit('/login');

        cy.wait('@userRequest').then(interception => {
            expect(interception.response?.statusCode).to.eq(200);
        });

        cy.url().should('eq', `${BASE_URL}/`);
    });
});

export { };