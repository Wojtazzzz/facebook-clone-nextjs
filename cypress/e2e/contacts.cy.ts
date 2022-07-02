import { useDatabaseMigrations } from 'cypress-laravel';
import type { UserType } from '../support/types';

describe('Contacts tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');
        cy.intercept('/api/friendship/friends/1?page=1').as('contacts_page_1');
        cy.intercept('/api/friendship/friends/1?page=2').as('contacts_page_2');
    });

    it('opens chat when click on user from list', () => {
        let friend: UserType;

        cy.create('User').then((user) => (friend = user));
        cy.create('Friendship', {
            user_id: 1,
            friend_id: 2,
            status: 'CONFIRMED',
        });

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@posts_page_1');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains(`${friend.first_name} ${friend.last_name}`).click();
        });

        cy.get('[data-testid="chat"]').should('be.visible');
    });

    it('displays load more button when fetched 10 contacts, can fetch more when click on it and after that load more buttton dissapear', () => {
        cy.create('User', 30);
        cy.create('Friendship', 15, {
            user_id: 1,
            status: 'CONFIRMED',
        });

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@posts_page_1');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').should('be.visible');
        cy.get('button[aria-label="Load more contacts"]').click();

        cy.wait('@contacts_page_2');

        cy.get('button[aria-label="Load more contacts"]').should('not.exist');
    });
});
