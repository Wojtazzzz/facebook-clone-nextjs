// <reference types="cypress" />;

Cypress.Commands.add('loginRequest', (email) => {
    const id = 1;

    cy.create('User', { id, email }).then(() => cy.login(id));
});

declare global {
    namespace Cypress {
        interface Chainable {
            loginRequest(email: string): Chainable<void>;
        }
    }
}

export {};
