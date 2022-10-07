import { useDatabaseMigrations } from 'cypress-laravel';

describe('Friends list tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();
    });

    it('go to friends list page due to sidebar, see 10 friends, load next 5 friends by scrolling to bottom', () => {
        cy.create('Friendship', 15, {
            user_id: 1,
            status: 'CONFIRMED',
        });

        cy.visit('/');

        cy.injectAxe();

        cy.intercept('/api/friends?page=1').as('friends_page_1');

        cy.checkPageA11y();

        cy.get('[data-testid="menu"]').within(() => {
            cy.contains('Friends').click();
        });

        cy.url().should('include', '/friends');

        cy.wait('@friends_page_1');

        cy.checkPageA11y();

        cy.window().scrollTo('bottom');

        cy.friendsListItems().should('have.length', 15);

        cy.checkPageA11y();
    });

    it('open chat with friend when click on "Send message" button', () => {
        cy.create('Friendship', 3, {
            user_id: 1,
            status: 'CONFIRMED',
        });

        cy.intercept('/api/friends?page=1').as('friends_page_1');

        cy.visit('/friends');

        cy.injectAxe();

        cy.wait('@friends_page_1');

        cy.friendsListItems()
            .first()
            .within(() => {
                cy.contains('Message').click();
            });

        cy.get('[data-testid="chat"]').should('be.visible');

        cy.checkPageA11y();
    });

    it('remove friend from friends list by click on "Remove" button, this same friend show on suggests list, on refreshed friends page his element dissapear from list', () => {
        cy.create('Friendship', 4, {
            user_id: 1,
            status: 'CONFIRMED',
        });

        cy.intercept('/api/friends?page=1').as('friends_page_1');
        cy.intercept('/api/friends/2').as('destroy');

        cy.visit('/friends');

        cy.wait('@friends_page_1');

        cy.injectAxe();

        cy.friendsListItems()
            .first()
            .within(() => {
                cy.get('button[aria-label="Remove"]').click();
            });

        cy.friendsListItems().first().should('not.exist');

        cy.checkPageA11y();

        cy.intercept('/api/suggests?page=1').as('suggests_page_1');

        cy.get('[data-testid="friends-nav"]').contains('Suggests').click();

        cy.wait('@suggests_page_1');

        cy.checkPageA11y();

        cy.friendsListItems().should('have.length', 1);

        cy.intercept('/api/friends?page=1').as('friends_page_1');

        cy.get('[data-testid="friends-nav"]').contains('Friends').click();

        cy.wait('@friends_page_1');

        cy.friendsListItems().should('have.length', 3);

        cy.checkPageA11y();
    });

    it('render empty component when api return empty data', () => {
        cy.intercept('/api/friends?page=1').as('friends_page_1');

        cy.visit('/friends');

        cy.wait('@friends_page_1');

        cy.injectAxe();

        cy.friendsListItems().should('not.exist');

        cy.get('[data-testid="empty-list"]').should('be.visible');

        cy.checkPageA11y();
    });

    it('render error component when api return server error', () => {
        cy.intercept('/api/friends?page=1', { statusCode: 500 }).as('friends_page_1');

        cy.visit('/friends');

        cy.wait('@friends_page_1');

        cy.injectAxe();

        cy.friendsListItems().should('not.exist');

        cy.get('[data-testid="server-error"]').should('be.visible');

        cy.checkPageA11y();
    });
});
