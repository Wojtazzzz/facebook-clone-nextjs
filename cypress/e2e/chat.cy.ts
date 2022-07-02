import { useDatabaseMigrations } from 'cypress-laravel';
import type { UserType } from '../support/types';

describe('Contacts tests', () => {
    let friend: UserType;

    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');
        cy.intercept('/api/friendship/friends/1?page=1').as('contacts_page_1');

        cy.create('User').then((user) => (friend = user));
        cy.create('Friendship', {
            user_id: 1,
            friend_id: 2,
            status: 'CONFIRMED',
        });
    });

    it('open chat when click on user from contacts, see empty conversation message and send new message', () => {
        cy.intercept('/api/messages/2?page=1').as('messages_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@posts_page_1');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains(`${friend.first_name} ${friend.last_name}`).click();
        });

        cy.wait('@messages_page_1');

        cy.get('[data-testid="chat"]').should('be.visible');
        cy.contains('Say hello to your friend!');

        cy.intercept('/api/messages').as('messages');
        cy.intercept('/api/messages/2?page=1').as('messages_page_1_second');

        cy.get('input[aria-label="Message input"]').type('Hello World!{enter}');

        cy.wait('@messages');
        // cy.wait('@messages_page_1_second');

        // cy.wait(30000);

        // cy.contains('Hello World!');

        // Chat to refactoring
    });
});