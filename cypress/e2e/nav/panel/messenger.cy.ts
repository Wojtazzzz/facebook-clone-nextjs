import { useDatabaseMigrations } from 'cypress-laravel';

describe('Messenger tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();

        cy.intercept('/api/user').as('user');
    });

    it('open messenger by click on messenger icon and open chat with properly friend', () => {
        cy.create('User', {
            first_name: 'John',
            last_name: 'Doe',
        });

        cy.create('Friendship', {
            user_id: 1,
            friend_id: 2,
            status: 'CONFIRMED',
        });

        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Messenger"]').click();
        });

        cy.get('[data-testid="messenger-list"]').within(() => {
            cy.contains('John Doe').click();
        });

        cy.get('[data-testid="chat"]')
            .should('be.visible')
            .within(() => {
                cy.contains('John Doe');
            });
    });

    it('messenger can be closed by pressing esc key', () => {
        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Messenger"]').click();
        });

        cy.get('[data-testid="dropdown"]').should('be.visible');

        cy.get('body').type('{esc}');

        cy.get('[data-testid="dropdown"]').should('not.exist');
    });

    it('messenger dissapears when click on outside page element', () => {
        cy.visit('/');
        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Messenger"]').click();
        });

        cy.get('[data-testid="dropdown"]').should('be.visible');

        cy.get('main').click();

        cy.get('[data-testid="dropdown"]').should('not.exist');
    });

    it('open messenger, see 15 users, fetch more users by scrolling to bottom', () => {
        cy.create('Friendship', 22, {
            user_id: 1,
            status: 'CONFIRMED',
        });

        cy.intercept('/api/messages?page=1').as('messages_page_1');

        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Messenger"]').click();
        });

        cy.wait('@messages_page_1');

        cy.get('button[aria-label="Click to open conversation"]').should('have.length', 15);

        cy.get('[id="list-of-messenger-contacts"]').scrollTo('bottom', { ensureScrollable: false });

        cy.get('button[aria-label="Click to open conversation"]').should('have.length', 22);
    });

    it('messenger render empty component because api return empty data', () => {
        cy.intercept('/api/messages?page=1').as('messages_page_1');

        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Messenger"]').click();
        });

        cy.wait('@messages_page_1');

        cy.get('[data-testid="empty-list"]').should('be.visible');
    });

    it('messenger render error component because api return server error', () => {
        cy.intercept('/api/messages?page=1', { statusCode: 500 }).as('messages_page_1');

        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Messenger"]').click();
        });

        cy.wait('@messages_page_1');

        cy.get('[data-testid="server-error"]').should('be.visible');
    });
});
