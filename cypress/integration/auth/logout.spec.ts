const BACKEND_URL = 'http://localhost:8000';

const EMAIL = 'admin@gmail.com';
const PASSWORD = 'admin';

describe('Logout process', () => {
    it('Logged user try to logout', () => {
        cy.intercept('GET', `${BACKEND_URL}/sanctum/csrf-cookie`).as('csrfRequest');
        cy.intercept('POST', `${BACKEND_URL}/login`).as('loginRequest');
        cy.intercept('POST', `${BACKEND_URL}/logout`).as('logoutRequest');

        cy.visit('/login');

        cy.get('input[name=email]').type(EMAIL);
        cy.get('input[name=password]').type(PASSWORD);
        cy.get('button[type="submit"]').click();

        cy.wait('@csrfRequest', { timeout: 10000 });
        cy.wait('@loginRequest', { timeout: 10000 });
        cy.intercept('GET', `${BACKEND_URL}/api/user`).as('userRequest');

        cy.wait('@userRequest', { timeout: 10000 });

        cy.get('nav').within(() => {
            cy.get('button[aria-label="Log out"]').click();
            cy.wait('@logoutRequest', { timeout: 10000 }).its('response.statusCode').should('eq', 204);
        });
    });
});

export { };