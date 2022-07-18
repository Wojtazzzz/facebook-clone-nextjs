import { useDatabaseMigrations } from 'cypress-laravel';

describe('Friends list tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();
    });

    it('go to page due to sidebar and fetch more friends by click on button and button dissapear because all users fetched', () => {
        cy.create('Friendship', 15, {
            user_id: 1,
            status: 'CONFIRMED',
        });

        cy.visit('/');

        cy.intercept('/api/friends?page=1').as('friends_page_1');

        cy.get('[data-testid="sidebar"]').within(() => {
            cy.contains('Friends').click();
        });

        cy.url().should('include', '/friends');

        cy.wait('@friends_page_1');

        cy.get('[data-testid="friends-list"] > a').should('have.length', 10);

        cy.intercept('/api/friends?page=1').as('friends_page_1');
        cy.intercept('/api/friends?page=2').as('friends_page_2');

        cy.get('[aria-label="Fetch more users"]').click();

        cy.wait('@friends_page_1');
        cy.wait('@friends_page_2');

        cy.get('[data-testid="friends-list"] > a').should('have.length', 15);

        cy.get('[aria-label="Fetch more users"]').should('not.exist');
    });

    it('open chat with friend when click on "Send message" button', () => {
        cy.create('Friendship', 3, {
            user_id: 1,
            status: 'CONFIRMED',
        });

        cy.intercept('/api/friends?page=1').as('friends_page_1');

        cy.visit('/friends');

        cy.wait('@friends_page_1');

        cy.get('[data-testid="friends-list"] > a:first').within(() => {
            cy.contains('Send message').click();
        });

        cy.get('[data-testid="chat"]').should('be.visible');
    });

    it('remove friend from friends list when click on "Remove" button, this same friend show on suggests list, on refreshed friends page his element dissapear from list', () => {
        cy.create('Friendship', 8, {
            user_id: 1,
            status: 'CONFIRMED',
        });

        cy.intercept('/api/friends?page=1').as('friends_page_1');
        cy.intercept('/api/friendship/destroy').as('destroy');

        cy.visit('/friends');

        cy.wait('@friends_page_1');

        cy.get('[data-testid="friends-list"] > a:first').within(() => {
            cy.contains('Remove').click();

            cy.wait('@destroy').its('response.statusCode').should('eq', 200);

            cy.contains('Friendship destroyed').should('be.visible');
        });

        cy.intercept('/api/friends/suggests?page=1').as('suggests_page_1');

        cy.get('[data-testid="friends-nav"] > a').contains('Suggests').click();

        cy.wait('@suggests_page_1');

        cy.get('[data-testid="friends-list"] > a').should('have.length', 1);

        cy.intercept('/api/friends?page=1').as('friends_page_1');

        cy.get('[data-testid="friends-nav"] > a').contains('Friends').click();

        cy.wait('@friends_page_1');

        cy.get('[data-testid="friends-list"] > a').should('have.length', 7);
    });
});
