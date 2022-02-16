const BASE_URL = Cypress.env('base_url');
const BACKEND_URL = Cypress.env('backend_url');

const TEST_EMAIL = Cypress.env('test_email');
const TEST_PASSWORD = Cypress.env('test_password');



describe('Sidebar links', () => {
    beforeEach(() => {
        cy.intercept('GET', `${BACKEND_URL}/sanctum/csrf-cookie`).as('csrfRequest');
        cy.intercept('POST', `${BACKEND_URL}/login`).as('loginRequest');

        cy.visit('/login');

        cy.get('input[name="email"]').type(TEST_EMAIL);
        cy.get('input[name="password"]').type(TEST_PASSWORD);

        cy.get('button[type="submit"]').click();

        cy.wait('@csrfRequest').then(() => {
            cy.wait('@loginRequest').then(() => {
                cy.url().should('eq', `${BASE_URL}/`);
            });
        });
    });

    it('Check /profile redirect exists', () => {
        cy.get('aside').within(() => {
            cy.get('a[href*="profile"]').click();
        });

        cy.wait(3000);
        cy.url().should('eq', `${BASE_URL}/profile/1`);
    });

    it('Check /friends redirect exists', () => {
        cy.get('aside').within(() => {
            cy.get('a[href*="friends"]').click();
        });

        cy.url().should('eq', `${BASE_URL}/friends`);
    });

    it('Check /pokes redirect exists', () => {
        cy.get('aside').within(() => {
            cy.get('a[href*="pokes"]').click();
        });

        cy.url().should('eq', `${BASE_URL}/pokes`);
    });

    it('Check github is visible', () => {
        cy.get('aside').within(() => {
            cy.get('a[href*="github"]').should('be.visible');
        });
    });
});


export { };