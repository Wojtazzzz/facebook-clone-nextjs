const BASE_URL = Cypress.config().baseUrl;
const BACKEND_URL = 'http://localhost:8000/';

const EMAIL = 'admin@gmail.com';
const PASSWORD = 'admin';

describe('Sidebar links', () => {
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

    it('Check /profile redirect exists', () => {
        cy.visit('/');

        cy.get('aside').within(() => {
            cy.get('a[href*="profile"]').click();
        });

        cy.url().should('eq', BASE_URL + '/profile');
    });

    it('Check /friends redirect exists', () => {
        cy.visit('/');

        cy.get('aside').within(() => {
            cy.get('a[href*="friends"]').click();
        });

        cy.url().should('eq', BASE_URL + '/friends');
    });

    it('Check /pokes redirect exists', () => {
        cy.visit('/');

        cy.get('aside').within(() => {
            cy.get('a[href*="pokes"]').click();
        });

        cy.url().should('eq', BASE_URL + '/pokes');
    });
});


export { };