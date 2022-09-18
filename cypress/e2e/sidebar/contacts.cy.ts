import { useDatabaseMigrations } from 'cypress-laravel';

describe('Contacts tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();
    });

    it('open chat when click on user', () => {
        cy.createUser(1, true, {
            first_name: 'John',
            last_name: 'Doe',
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/contacts?page=1').as('contacts_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains('John Doe').click();
        });

        cy.get('[data-testid="chat"]').should('be.visible');
        cy.get('[data-testid="chat"]').contains('John Doe');
    });

    it('load and render 20 contacts and fetch more by scrolling to bottom', () => {
        cy.createFriendship(23);

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/contacts?page=1').as('contacts_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.get('button[aria-label*="Open chat with"]').should('have.length', 20);
        });

        cy.get('[id="sidebar"]').scrollTo('bottom', { ensureScrollable: false });

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.get('button[aria-label*="Open chat with"]').should('have.length', 23);
        });
    });

    it('list render empty component when api return empty data', () => {
        cy.intercept('/api/user').as('user');
        cy.intercept('/api/contacts?page=1').as('contacts_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="empty-list"]').should('be.visible');
    });

    it('list render error component when api return server error', () => {
        cy.intercept('/api/user').as('user');
        cy.intercept('/api/contacts?page=1', { statusCode: 500 }).as('contacts_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="server-error"]').should('be.visible');
    });
});
