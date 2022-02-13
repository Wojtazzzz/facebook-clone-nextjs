const BASE_URL = Cypress.config().baseUrl;
const BACKEND_URL = 'http://localhost:8000';

const EMAIL = 'admin@gmail.com';
const PASSWORD = 'admin';


describe('Login process', () => {
    it('Is login page exists', () => {
        cy.visit('/login');

        cy.get('span').contains('This page isn\'t available').should('not.exist');
    });

    it('Can login to admin account', () => {
        cy.intercept('GET', `${BACKEND_URL}/sanctum/csrf-cookie`).as('csrfRequest');
        cy.intercept('POST', `${BACKEND_URL}/login`).as('loginRequest');

        cy.visit('/login');

        cy.get('input[name=email]').type(EMAIL);
        cy.get('input[name=password]').type(PASSWORD);

        cy.get('button[type="submit"]').click().should('be.disabled');

        cy.wait('@csrfRequest').its('response.statusCode').should('eq', 204).then(() => {
            cy.wait('@loginRequest').its('response.statusCode').should('eq', 204);
        });

        cy.intercept('GET', `${BACKEND_URL}/api/user`).as('userRequest');

        cy.url().should('eq', BASE_URL + '/')

        cy.wait('@userRequest', { timeout: 8000 }).its('response.statusCode').should('eq', 200);
    });

    it('Login to not existing account and check is request error visible', () => {
        cy.intercept('GET', `${BACKEND_URL}/sanctum/csrf-cookie`).as('csrfRequest');
        cy.intercept('POST', `${BACKEND_URL}/login`).as('loginRequest');

        cy.visit('/login');

        cy.get('input[name=email]').type(EMAIL);
        cy.get('input[name=password]').type(PASSWORD + "s");

        cy.get('button[type="submit"]').click();

        cy.wait('@csrfRequest').its('response.statusCode').should('eq', 204);
        cy.wait('@loginRequest').its('response.statusCode').should('eq', 422);

        cy.intercept('GET', `${BACKEND_URL}/api/user`).as('userRequest');

        cy.url().should('eq', BASE_URL + '/login');

        cy.wait('@userRequest', { timeout: 15000 }).its('response.statusCode').should('eq', 401);

        cy.get('form').within(() => {
            cy.get('div').contains('Whoops! Something went wrong.').should('be.visible');
        });
    });

    it('Are visible formik error messages under fields', () => {
        cy.visit('/login');

        cy.get('input[name=email]').type(' ');
        cy.get('button[type="submit"]').click();

        cy.get('form').within(() => {
            cy.get('small').contains('Email field is required').should('be.visible');
            cy.get('small').contains('Password field is required').should('be.visible');
        });

        cy.get('input[name=email]').type('some_string_which_is_not_correct_email');
        cy.get('button[type="submit"]').click();

        cy.get('form').within(() => {
            cy.get('small').contains('Email is invalid').should('be.visible');
        });
    });
});

export { };