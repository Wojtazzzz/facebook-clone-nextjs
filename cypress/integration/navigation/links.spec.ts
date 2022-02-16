const BASE_URL = Cypress.config().baseUrl;
const BACKEND_URL = 'http://localhost:8000';

const EMAIL = 'admin@gmail.com';
const PASSWORD = 'admin';

describe('Navigation links', () => {
    beforeEach(() => {
        cy.intercept('GET', `${BACKEND_URL}/sanctum/csrf-cookie`).as('csrfRequest');
        cy.intercept('POST', `${BACKEND_URL}/login`).as('loginRequest');

        cy.visit('/login');

        cy.get('input[name=email]').type(EMAIL);
        cy.get('input[name=password]').type(PASSWORD);

        cy.get('button[type="submit"]').click();

        cy.wait('@csrfRequest');
        cy.wait('@loginRequest');

        cy.url().should('eq', BASE_URL + '/');
    });

    afterEach(() => {
        cy.get('span').contains('This page isn\'t available').should('not.exist');
    });

    it('Check / redirect exists', () => {
        cy.visit('/marketplace');

        cy.get('a[data-test-id="navigation-redirect-home"]').click();
        cy.wait(1000);
        cy.url().should('eq', BASE_URL + '/');
    });

    it('Check /marketplace redirect exists', () => {
        cy.visit('/profile');

        cy.get('a[data-test-id="navigation-redirect-marketplace"]').click();
        cy.wait(1000);z
        cy.url().should('eq', BASE_URL + '/marketplace');
    });

    it('Check /profile redirect exists', () => {
        cy.visit('/');

        cy.get('a[data-test-id="navigation-redirect-profile"]').click();
        cy.wait(1000);
        cy.url().should('eq', BASE_URL + '/profile');
    });
});

export { };