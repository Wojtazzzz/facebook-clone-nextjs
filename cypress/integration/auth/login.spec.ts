const BASE_URL = Cypress.env('base_url');
const BACKEND_URL = Cypress.env('backend_url');

const TEST_EMAIL = Cypress.env('test_email');
const TEST_PASSWORD = Cypress.env('test_password');


describe('Login', () => {
    beforeEach(() => {
        cy.intercept('GET', `${BACKEND_URL}/sanctum/csrf-cookie`).as('csrf');
        cy.intercept('POST', `${BACKEND_URL}/login`).as('login');

        cy.visit('/login');
    });

    it('Login to test account', () => {
        cy.request(`${BACKEND_URL}/api/tests`).then(response => {
            expect(response.status).to.eq(200);
        });

        cy.get('input[name="email"]').type(TEST_EMAIL);
        cy.get('input[name="password"]').type(TEST_PASSWORD);

        cy.get('button[type="submit"]').click().should('be.disabled');

        cy.wait('@csrf').then(interception => {
            expect(interception.response?.statusCode).to.eq(204);
        });

        cy.wait('@login').then(interception => {
            expect(interception.response?.statusCode).to.eq(204);
        });

        cy.intercept('GET', `${BACKEND_URL}/api/user`).as('user');

        cy.wait('@user').then(interception => {
            expect(interception.response?.statusCode).to.eq(200);
        });

        cy.url().should('eq', `${BASE_URL}/`);
    });

    it('Login to not existing account', () => {
        cy.get('input[name="email"]').type(TEST_EMAIL);
        cy.get('input[name="password"]').type('fake_user_password');

        cy.get('button[type="submit"]').click();

        cy.wait('@csrf').then(interception => {
            expect(interception.response?.statusCode).to.eq(204);
        });

        cy.wait('@login').then(interception => {
            expect(interception.response?.statusCode).to.eq(422);
        });

        cy.url().should('eq', `${BASE_URL}/login`);

        cy.get('form').within(() => {
            cy.get('div').contains('Whoops! Something went wrong.').should('be.visible');
        });
    });

    it('Check for formik validation messages', () => {
        cy.visit('/login');

        cy.get('input[name="email"]').type(' ');
        cy.get('button[type="submit"]').click();

        cy.get('form').within(() => {
            cy.get('small').contains('Email field is required').should('be.visible');
            cy.get('small').contains('Password field is required').should('be.visible');
        });

        cy.get('input[name="email"]').type('some_string_which_is_incorrect_email');
        cy.get('button[type="submit"]').click();

        cy.get('form').within(() => {
            cy.get('small').contains('Email is invalid').should('be.visible');
        });
    });
});

export { };