// <reference types="cypress" />;

Cypress.Commands.add('loginRequest', () => {
    const id = 1;
    const email = Cypress.env('USER_EMAIL');
    const first_name = Cypress.env('USER_FIRST_NAME');
    const last_name = Cypress.env('USER_LAST_NAME');

    cy.create('User', { id, email, first_name, last_name });
    cy.login(id);
});

declare global {
    namespace Cypress {
        interface Chainable {
            loginRequest(): Chainable<void>;
        }
    }
}

export {};
