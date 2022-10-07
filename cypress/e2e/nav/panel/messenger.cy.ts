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

        cy.injectAxe();

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Messenger"]').click();
        });

        cy.checkPageA11y();

        cy.get('[data-testid="messenger-list"]').within(() => {
            cy.contains('John Doe').click();
        });

        cy.get('[data-testid="chat"]')
            .should('be.visible')
            .within(() => {
                cy.contains('John Doe');
            });

        cy.checkPageA11y();
    });

    it('messenger dissapears when click on close button', () => {
        cy.visit('/');
        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Messenger"]').click();
        });
    });

    it('open messenger, see 15 users, fetch more users by scrolling to bottom, close dropdown by press esc', () => {
        cy.create('Friendship', 22, {
            user_id: 1,
            status: 'CONFIRMED',
        });

        cy.intercept('/api/messages?page=1').as('messages_page_1');

        cy.visit('/');

        cy.wait('@user');

        cy.injectAxe();

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Messenger"]').click();
        });

        cy.wait('@messages_page_1');

        cy.get('button').filter(':contains("Click to open chat")').should('have.length', 15);

        cy.checkPageA11y();

        cy.intercept('/api/messages?page=2').as('messages_page_2');

        cy.get('[id="messenger-list"]').scrollTo('bottom', { ensureScrollable: false });

        cy.wait('@messages_page_2');

        cy.get('button').filter(':contains("Click to open chat")').should('have.length', 22);

        cy.checkPageA11y();

        cy.get('[data-testid="dropdown"]').should('be.visible');

        cy.get('body').type('{esc}');

        cy.get('[data-testid="dropdown"]').should('not.exist');
    });

    it("messenger doesn't have icon and render empty component when api return empty response, close messenger by click on outside element", () => {
        cy.intercept('/api/messages?page=1').as('messages_page_1');
        cy.intercept('/api/messages/checkUnread').as('checkUnread');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@checkUnread');

        cy.injectAxe();

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Messenger"]').click();
        });

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Messenger"]')
                .parent()
                .within(() => {
                    cy.get('[data-testid="alert"]').should('not.exist');
                });
        });

        cy.wait('@messages_page_1');

        cy.get('[data-testid="empty-list"]').should('be.visible');

        cy.checkPageA11y();

        cy.get('[data-testid="dropdown"]').should('be.visible');

        cy.get('main').click();

        cy.get('[data-testid="dropdown"]').should('not.exist');
    });

    it('messenger render error component because api return server error', () => {
        cy.intercept('/api/messages?page=1', { statusCode: 500 }).as('messages_page_1');

        cy.visit('/');

        cy.wait('@user');

        cy.injectAxe();

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Messenger"]').click();
        });

        cy.wait('@messages_page_1');

        cy.get('[data-testid="server-error"]').should('be.visible');

        cy.checkPageA11y();
    });

    it('messenger button has alert icon when api return unread messages from one user, read that messages, see that alert in messenger icon dissapear', () => {
        cy.createUser(1, true, {
            id: 999,
        });

        cy.create('Message', 3, {
            receiver_id: 1,
            sender_id: 999,
        });

        cy.intercept('/api/messages/checkUnread').as('checkUnread');

        cy.visit('/');

        cy.injectAxe();

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Messenger"]')
                .parent()
                .within(() => {
                    cy.get('[data-testid="alert"]').should('be.visible');
                });
        });

        cy.intercept('/api/messages/999/update').as('markAsRead');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.get('button[aria-label*="Open chat with"]').click();
        });

        cy.get('[data-testid="chat"]').should('be.visible');

        cy.wait('@markAsRead');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Messenger"]')
                .parent()
                .within(() => {
                    cy.get('[data-testid="alert"]').should('not.exist');
                });
        });

        cy.checkPageA11y();
    });

    it("messenger button has alert icon when api return unread messages from many users, read messages from only one user, see that alert in messenger icon doesn't dissapear", () => {
        cy.createUser(1, true, {
            first_name: 'John',
            last_name: 'Doe',
            id: 999,
        });

        cy.createUser(1, true, {
            id: 99999,
        });

        cy.create('Message', 3, {
            receiver_id: 1,
            sender_id: 999,
        });

        cy.create('Message', 3, {
            receiver_id: 1,
            sender_id: 99999,
        });

        cy.intercept('/api/messages/checkUnread').as('checkUnread');

        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Messenger"]')
                .parent()
                .within(() => {
                    cy.get('[data-testid="alert"]').should('be.visible');
                });
        });

        cy.intercept('/api/messages/999/update').as('markAsRead');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.get('button[aria-label="Open chat with John Doe"]').click();
        });

        cy.get('[data-testid="chat"]').should('be.visible');

        cy.wait('@markAsRead');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Messenger"]')
                .parent()
                .within(() => {
                    cy.get('[data-testid="alert"]').should('be.visible');
                });
        });
    });
});
